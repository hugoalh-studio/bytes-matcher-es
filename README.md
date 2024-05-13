# Bytes Matcher (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh-studio/bytes-matcher-es](https://img.shields.io/github/v/release/hugoalh-studio/bytes-matcher-es?label=hugoalh-studio/bytes-matcher-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/bytes-matcher-es")](https://github.com/hugoalh-studio/bytes-matcher-es)
[![JSR: @hugoalh/bytes-matcher](https://img.shields.io/jsr/v/@hugoalh/bytes-matcher?label=JSR%20@hugoalh/bytes-matcher&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/bytes-matcher")](https://jsr.io/@hugoalh/bytes-matcher)
[![NPM: @hugoalh/bytes-matcher](https://img.shields.io/npm/v/@hugoalh/bytes-matcher?label=@hugoalh/bytes-matcher&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/bytes-matcher")](https://www.npmjs.com/package/@hugoalh/bytes-matcher)

An ES (JavaScript & TypeScript) module to determine whether the bytes is match the specify signature.

## 🔰 Begin

### 🎯 Targets

|  | **Registry - JSR** | **Registry - NPM** | **Remote Import** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | [✔️ `node_modules`](https://jsr.io/docs/npm-compatibility) | [✔️ Specifier `npm:`](https://bun.sh/docs/runtime/autoimport) | ❌ |
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | [✔️ `node_modules`](https://jsr.io/docs/with/cloudflare-workers) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |
| **[Deno](https://deno.land/)** >= v1.42.0 | [✔️ Specifier `jsr:`](https://jsr.io/docs/with/deno) | [✔️ Specifier `npm:`](https://docs.deno.com/runtime/manual/node/npm_specifiers) | [✔️](https://docs.deno.com/runtime/manual/basics/modules/#remote-import) |
| **[NodeJS](https://nodejs.org/)** >= v16.13.0 | [✔️ `node_modules`](https://jsr.io/docs/with/node) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |

> **ℹ️ Note**
>
> It is possible to use this module in other methods/ways which not listed in here, however it is not officially supported.

### #️⃣ Registries Identifier

- **JSR:**
  ```
  @hugoalh/bytes-matcher
  ```
- **NPM:**
  ```
  @hugoalh/bytes-matcher
  ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to use this module with tag for immutability.

### #️⃣ Remote Import Paths

- **GitHub Raw:** (Require Tag)
  ```
  https://raw.githubusercontent.com/hugoalh-studio/bytes-matcher-es/${Tag}/mod.ts
  ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module with the main path `mod.ts`, it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - Although there have 3rd party services which provide enhanced, equal, or similar methods/ways to remote import the module, beware these services maybe inject unrelated elements and thus affect the security.

### 🛡️ Permissions

*This module does not require any permission.*

## 🧩 APIs

- ```ts
  class BytesMatcher {
    constructor(signature: BytesMatcherSignature<string | Uint8Array>[]): this;
    test(item: string | Uint8Array): boolean;
    testFile(file: string | URL | Deno.FsFile): Promise<boolean>;
    get weight(): number;
  }
  ```
- ```ts
  class MagicBytesMatcher {
    constructor(filter?: (meta: MagicBytesMeta) => boolean): this;
    match(item: string | Uint8Array): MagicBytesMetaExtend | null;
    matchAll(item: string | Uint8Array): Generator<MagicBytesMetaExtend>;
    matchFile(file: string | URL | Deno.FsFile): Promise<MagicBytesMetaExtend | null>;
    matchFileAll(file: string | URL | Deno.FsFile): AsyncGenerator<MagicBytesMetaExtend>;
    test(item: string | Uint8Array): boolean;
    testFile(file: string | URL | Deno.FsFile): Promise<boolean>;
  }
  ```
- ```ts
  interface BytesMatcherSignature<T extends string | Uint8Array> {
    /**
     * Offset of the signature, by integer; Negative integer means offset from the end of the bytes.
     */
    offset: number;
    /**
     * Pattern of the signature.
     */
    pattern: T;
  }
  ```
- ```ts
  interface MagicBytesMeta {
    /**
     * Category of the magic bytes.
     */
    category: MagicBytesMetaCategory;
    /**
     * Extensions of the magic bytes, always start with a dot (`.`).
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
  ```
- ```ts
  interface MagicBytesMetaExtend extends MagicBytesMeta {
    /**
     * Weight of the magic bytes.
     */
    weight: number;
  }
  ```
- ```ts
  type MagicBytesMetaCategory = "archive" | "audio" | "compressed" | "database" | "diagram" | "disk" | "document" | "ebook" | "executable" | "font" | "formula" | "geospatial" | "image" | "metadata" | "model" | "other" | "package" | "playlist" | "presentation" | "rom" | "spreadsheet" | "subtitle" | "video";
  ```

> **ℹ️ Note**
>
> For the prettier documentation, can visit via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [JSR](https://jsr.io/@hugoalh/bytes-matcher)
