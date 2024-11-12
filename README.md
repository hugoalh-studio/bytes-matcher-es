# Bytes Matcher (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/bytes-matcher-es](https://img.shields.io/github/v/release/hugoalh/bytes-matcher-es?label=hugoalh/bytes-matcher-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/bytes-matcher-es")](https://github.com/hugoalh/bytes-matcher-es)
[![JSR: @hugoalh/bytes-matcher](https://img.shields.io/jsr/v/@hugoalh/bytes-matcher?label=@hugoalh/bytes-matcher&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/bytes-matcher")](https://jsr.io/@hugoalh/bytes-matcher)
[![NPM: @hugoalh/bytes-matcher](https://img.shields.io/npm/v/@hugoalh/bytes-matcher?label=@hugoalh/bytes-matcher&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/bytes-matcher")](https://www.npmjs.com/package/@hugoalh/bytes-matcher)

An ES (JavaScript & TypeScript) module to determine whether the bytes is match the specify signature.

## 🔰 Begin

### 🎯 Targets

|  | **Remote** | **JSR** | **NPM** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ❓ | ✔️ |
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | ❌ | ❓ | ✔️ |
| **[Deno](https://deno.land/)** >= v1.45.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v16.13.0 | ❌ | ❓ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/bytes-matcher-es/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/bytes-matcher[@{Tag}]
  ```
- **NPM:**
  ```
  [npm:]@hugoalh/bytes-matcher[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR or NPM resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Require Runtime Permissions

*This module does not require any runtime permission.*

## 🧩 APIs (Excerpt)

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
    offset: number;
    pattern: T;
  }
  ```
- ```ts
  interface MagicBytesMeta {
    category: MagicBytesMetaCategory;
    extensions: `.${string}`[];
    mimes: string[];
    name: string;
    variant?: string;
  }
  ```
- ```ts
  interface MagicBytesMetaExtend extends MagicBytesMeta {
    weight: number;
  }
  ```
- ```ts
  type MagicBytesMetaCategory = "archive" | "audio" | "compressed" | "database" | "diagram" | "disk" | "document" | "ebook" | "executable" | "font" | "formula" | "geospatial" | "image" | "metadata" | "model" | "other" | "package" | "playlist" | "presentation" | "rom" | "spreadsheet" | "subtitle" | "video";
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/bytes-matcher)
