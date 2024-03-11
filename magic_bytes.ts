import MagicBytesList from "./magic_bytes_list.json" with { type: "json" };
import { BytesMatcher, type BytesMatcherSignature } from "./matcher.ts";
export type MagicBytesMetaCategory = "archive" | "audio" | "compressed" | "database" | "diagram" | "disk" | "document" | "ebook" | "executable" | "font" | "formula" | "geospatial" | "image" | "metadata" | "model" | "other" | "package" | "playlist" | "presentation" | "rom" | "spreadsheet" | "subtitle" | "video";
export interface MagicBytesMeta {
	/**
	 * Category of the magic bytes.
	 */
	category: MagicBytesMetaCategory;
	/**
	 * Extensions of the magic bytes.
	 * @default []
	 */
	extensions: `.${string}`[];
	/**
	 * MIMEs of the magic bytes.
	 * @default []
	 */
	mimes: string[];
	/**
	 * Name of the magic bytes.
	 */
	name: string;
	/**
	 * Variant of the magic bytes. Only available when multiple signatures with same meta.
	 * @default undefined
	 */
	variant?: string;
}
interface MagicBytesEntry extends MagicBytesMeta {
	signature: BytesMatcherSignature<string>[];
}
export interface MagicBytesMetaWithWeight extends MagicBytesMeta {
	/**
	 * Weight of the magic bytes.
	 */
	weight: number;
}
interface MagicBytesListEntry {
	matcher: BytesMatcher;
	meta: MagicBytesMetaWithWeight;
}
/**
 * Magic bytes matcher to determine whether the bytes is match the specify magic bytes.
 */
export class MagicBytesMatcher {
	#list: MagicBytesListEntry[] = [];
	/**
	 * Initialize magic bytes matcher.
	 * @param {(meta: MagicBytesMeta) => boolean} [filter] Filter.
	 */
	constructor(filter?: (meta: MagicBytesMeta) => boolean) {
		for (const { signature, ...meta } of (MagicBytesList as MagicBytesEntry[])) {
			if (filter?.(meta) ?? true) {
				try {
					const matcher: BytesMatcher = new BytesMatcher(signature);
					this.#list.push({
						matcher,
						meta: {
							...meta,
							weight: matcher.weight
						}
					});
				} catch (error) {
					throw new Error(`Unable to initialize magic bytes matcher with meta ${JSON.stringify(meta)}: ${error?.message ?? error}`);
				}
			}
		}
		if (this.#list.length === 0) {
			throw new Error(`Matcher is empty!`);
		}
		this.#list.sort((a: MagicBytesListEntry, b: MagicBytesListEntry): number => {
			return (b.meta.weight - a.meta.weight);
		});
	}
	/**
	 * List all of the magic bytes meta which the bytes is match.
	 * @param {string | Uint8Array} item Item that need to determine.
	 * @returns {Generator<MagicBytesMetaWithWeight>} Magic bytes meta list.
	 */
	*matchAll(item: string | Uint8Array): Generator<MagicBytesMetaWithWeight> {
		for (const { matcher, meta } of this.#list) {
			if (matcher.test(item)) {
				yield meta;
			}
		}
	}
	/**
	 * List all of the magic bytes meta which the file bytes is match.
	 * @param {string | URL | Deno.FsFile} file File that need to determine.
	 * @returns {AsyncGenerator<MagicBytesMetaWithWeight>} Magic bytes meta list.
	 */
	async *matchFileAll(file: string | URL | Deno.FsFile): AsyncGenerator<MagicBytesMetaWithWeight> {
		const fileResolve: Deno.FsFile = (file instanceof Deno.FsFile) ? file : (await Deno.open(file));
		try {
			for (const { matcher, meta } of this.#list) {
				if (await matcher.testFile(fileResolve)) {
					yield meta;
				}
			}
		} finally {
			if (!(file instanceof Deno.FsFile)) {
				fileResolve.close();
			}
		}
	}
	/**
	 * Return the magic bytes meta which the bytes is match the closest.
	 * @param {string | Uint8Array} item Item that need to determine.
	 * @returns {MagicBytesMetaWithWeight | null} Magic bytes meta.
	 */
	match(item: string | Uint8Array): MagicBytesMetaWithWeight | null {
		for (const _ of this.matchAll(item)) {
			return _;
		}
		return null;
	}
	/**
	 * Return the magic bytes meta which the file bytes is match the closest.
	 * @param {string | URL | Deno.FsFile} file File that need to determine.
	 * @returns {Promise<MagicBytesMetaWithWeight | null>} Magic bytes meta.
	 */
	async matchFile(file: string | URL | Deno.FsFile): Promise<MagicBytesMetaWithWeight | null> {
		for await (const _ of this.matchFileAll(file)) {
			return _;
		}
		return null;
	}
	/**
	 * Determine whether the bytes is match any of specify magic bytes.
	 * @param {string | Uint8Array} item Item that need to determine.
	 * @returns {boolean} Determine result.
	 */
	test(item: string | Uint8Array): boolean {
		return (this.match(item) !== null);
	}
	/**
	 * Determine whether the file bytes is match any of specify magic bytes.
	 * @param {string | URL | Deno.FsFile} file File that need to determine.
	 * @returns {Promise<boolean>} Determine result.
	 */
	async testFile(file: string | URL | Deno.FsFile): Promise<boolean> {
		return (await this.matchFile(file) !== null);
	}
}
export default MagicBytesMatcher;
