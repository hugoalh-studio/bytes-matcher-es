/**
 * Signature of the bytes matcher.
 */
export interface BytesMatcherSignature<T extends string | Uint8Array> {
	/**
	 * Offset of the signature, by integer; Negative integer means offset from the end of the bytes.
	 */
	offset: number;
	/**
	 * Pattern of the signature.
	 */
	pattern: T;
}
/**
 * Bytes matcher to determine whether the bytes is match the specify signature.
 */
export class BytesMatcher {
	#signatureHead: Map<number, number> = new Map<number, number>();
	#signatureTail: Map<number, number> = new Map<number, number>();
	/**
	 * Initialize bytes matcher.
	 * @param {BytesMatcherSignature<string | Uint8Array>[]} signature Signature.
	 */
	constructor(signature: BytesMatcherSignature<string | Uint8Array>[]) {
		if (signature.length === 0) {
			throw new TypeError(`Parameter \`signature\` is not defined!`);
		}
		for (const { offset: offsetFrom, pattern } of signature) {
			if (!Number.isSafeInteger(offsetFrom)) {
				throw new SyntaxError(`\`${offsetFrom}\` is not a valid offset!`);
			}
			if (pattern.length === 0) {
				throw new SyntaxError(`Pattern is empty from offset ${offsetFrom}!`);
			}
			const patternFmt: number[] = Array.from((typeof pattern === "string") ? (new TextEncoder().encode(pattern)) : Uint8Array.of(...pattern));
			const offsetTo: number = offsetFrom + patternFmt.length;
			if (offsetFrom < 0 && offsetTo > 0) {
				throw new Error(`Pattern is overflow (most likely cause by incorrect offset)! Offset Current: ${offsetFrom}; Offset Possible: <= ${offsetFrom - offsetTo}`);
			}
			for (let index = 0; index < patternFmt.length; index += 1) {
				const cursor: number = offsetFrom + index;
				const byte: number = patternFmt[index];
				const byteMayDefine: number | undefined = this.#signatureHead.get(cursor) ?? this.#signatureTail.get(cursor);
				if (typeof byteMayDefine !== "undefined") {
					throw new SyntaxError(`Offset of ${cursor} is already defined! Exist: \\x${byteMayDefine.toString(16)}; Override: \\x${byte.toString(16)}`);
				}
				(cursor >= 0) ? this.#signatureHead.set(cursor, byte) : this.#signatureTail.set(cursor, byte);
			}
		}
		if (this.#signatureHead.size + this.#signatureTail.size === 0) {
			throw new Error(`Signature is empty!`);
		}
	}
	/**
	 * Map signature (majorly for tail signature) by the size of the file.
	 * @access private
	 * @param {number} fileSize Size of the file, by bytes.
	 * @returns {Map<number, number> | null}
	 */
	#mapSignatureByFileSize(fileSize: number): Map<number, number> | null {
		if (fileSize > Number.MAX_SAFE_INTEGER) {
			throw new Error(`Size of the file is too large!`);
		}
		if (Math.max(...Array.from(this.#signatureHead.keys())) >= fileSize) {
			// Signature of head must smaller than or equal to the size of the file.
			return null;
		}
		const signatureRemap: Map<number, number> = new Map<number, number>(this.#signatureHead.entries());
		for (const [offset, byte] of this.#signatureTail.entries()) {
			const offsetResolve: number = fileSize + offset;
			if (
				offsetResolve < 0 ||
				typeof signatureRemap.get(offsetResolve) !== "undefined"
			) {
				// Signature of head and tail must not overlap each other, overlapped means the file is too small and definitely not match.
				return null;
			}
			signatureRemap.set(offsetResolve, byte);
		}
		return signatureRemap;
	}
	/**
	 * Determine whether the bytes is match the specify signature.
	 * @param {string | Uint8Array} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: string | Uint8Array): boolean {
		if (item.length === 0) {
			return false;
		}
		const itemFmt: Uint8Array = (typeof item === "string") ? (new TextEncoder().encode(item)) : Uint8Array.of(...item);
		for (const [offset, byte] of [...this.#signatureHead.entries(), ...this.#signatureTail.entries()]) {
			if (itemFmt[offset] !== byte) {
				return false;
			}
		}
		return true;
	}
	/**
	 * Determine whether the file is match the specify signature.
	 * 
	 * > **🛡️ Require Runtime Permissions**
	 * > 
	 * > - Deno
	 * >   - File System - Read (`read`)
	 * >     - *Resources*
	 * @param {string | URL | Deno.FsFile} file File that need to determine.
	 * @returns {Promise<boolean>} Determine result.
	 */
	async testFile(file: string | URL | Deno.FsFile): Promise<boolean> {
		const fileAbstract: Deno.FsFile = (file instanceof Deno.FsFile) ? file : (await Deno.open(file));
		try {
			const { isFile, size }: Deno.FileInfo = await fileAbstract.stat();
			if (!isFile) {
				throw new Error(`This is not a file!`);
			}
			const signatureRemap: Map<number, number> | null = this.#mapSignatureByFileSize(size);
			if (signatureRemap === null) {
				return false;
			}
			const reader: ReadableStreamDefaultReader<Uint8Array> = fileAbstract.readable.getReader();
			let cursor = 0;
			const cursorMaximum: number = Math.max(...Array.from(signatureRemap.keys()));
			while (true) {
				const { done, value } = await reader.read();
				if (typeof value !== "undefined") {
					for (let index = 0; index < value.length; index += 1) {
						const byte: number | undefined = signatureRemap.get(cursor);
						if (typeof byte !== "undefined" && value[index] !== byte) {
							return false;
						}
						cursor += 1;
						if (cursor > cursorMaximum) {
							return true;
						}
					}
				}
				if (done) {
					return false;
				}
			}
		} finally {
			if (!(file instanceof Deno.FsFile)) {
				fileAbstract.close();
			}
		}
	}
	/**
	 * Weight of the bytes matcher. Useful for reduce rate of false positive.
	 * @returns {number} Weight of the bytes matcher.
	 */
	get weight(): number {
		return (this.#signatureHead.size + this.#signatureTail.size);
	}
}
export default BytesMatcher;
