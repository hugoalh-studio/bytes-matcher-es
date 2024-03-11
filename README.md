# Bytes Matcher (TypeScript)

[**⚖️** MIT](./LICENSE.md)

**🗂️**
[![GitHub: hugoalh-studio/bytes-matcher-ts](https://img.shields.io/badge/hugoalh--studio/bytes--matcher--ts-181717?logo=github&logoColor=ffffff&style=flat "GitHub: hugoalh-studio/bytes-matcher-ts")](https://github.com/hugoalh-studio/bytes-matcher-ts)
[![JSR: @hugoalh/bytes-matcher](https://img.shields.io/badge/JSR-@hugoalh/bytes--matcher-F7DF1E?labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/bytes-matcher")](https://jsr.io/@hugoalh/bytes-matcher)

**🆙** ![Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/bytes-matcher-ts?sort=semver&color=2187C0&label=&style=flat "Latest Release Version") (![Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/bytes-matcher-ts?color=2187C0&label=&style=flat "Latest Release Date"))

A TypeScript module to determine whether the bytes is match the specify signature.

## 🎯 Target

<!--
- Bun ^ v1.0.0
- Cloudflare Workers
-->
- Deno >= v1.34.0 / >= v1.41.1 *(Via JSR)*
  > **🛡️ Require Permission**
  >
  > *N/A*
<!--
- NodeJS >= v16.13.0
-->

## 🔰 Usage

### Via HTTPS

<!--
> **🎯 Supported Target**
>
> - Deno
-->
1. Import at the script (`<ScriptName>.ts`):
    - Via DenoPKG
      ```ts
      import ... from "https://denopkg.com/hugoalh-studio/bytes-matcher-ts[@<Tag>]/mod.ts";
      ```
    - Via GitHub Raw (Require Tag)
      ```ts
      import ... from "https://raw.githubusercontent.com/hugoalh-studio/bytes-matcher-ts/<Tag>/mod.ts";
      ```
    - Via Pax
      ```ts
      import ... from "https://pax.deno.dev/hugoalh-studio/bytes-matcher-ts[@<Tag>]/mod.ts";
      ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module with the main path `mod.ts`, it is also able to import part of the module with sub path if available, but do not import if:
    >
    > - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
    > - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
    > - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
    >
    > These elements are not considered part of the public API, thus no stability is guaranteed for them.

### Via JSR With Native Support

<!--
> **🎯 Supported Target**
>
> - Deno
-->
1. Import at the script (`<ScriptName>.ts`):
    ```ts
    import ... from "jsr:@hugoalh/bytes-matcher[@<Tag>]";
    ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.

<!--
### Via JSR With NPM Compatibility Layer Support

> **🎯 Supported Target**
>
> - Bun
> - Cloudflare Workers
> - NodeJS

1. Install via console/shell/terminal:
    - Via Bun
      ```sh
      bunx jsr add @hugoalh/bytes-matcher[@<Tag>]
      ```
    - Via NPM
      ```sh
      npx jsr add @hugoalh/bytes-matcher[@<Tag>]
      ```
    - Via PNPM
      ```sh
      pnpm dlx jsr add @hugoalh/bytes-matcher[@<Tag>]
      ```
    - Via Yarn
      ```sh
      yarn dlx jsr add @hugoalh/bytes-matcher[@<Tag>]
      ```
2. Import at the script (`<ScriptName>.ts`):
    ```ts
    import ... from "@hugoalh/bytes-matcher";
    ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
-->
## 🧩 API

- ```ts
  class BytesMatcher {
    constructor(signature: BytesMatcherSignature<string | Uint8Array>[]): BytesMatcher;
    test(item: string | Uint8Array): boolean;
    testFile(file: string | URL | Deno.FsFile): Promise<boolean>;
    get weight(): number;
  }
  ```
- ```ts
  class MagicBytesMatcher {
    constructor(filter?: (meta: MagicBytesMeta) => boolean): MagicBytesMatcher;
    *matchAll(item: string | Uint8Array): Generator<MagicBytesMetaWithWeight>;
    *matchFileAll(file: string | URL | Deno.FsFile): AsyncGenerator<MagicBytesMetaWithWeight>;
    match(item: string | Uint8Array): MagicBytesMetaWithWeight | null;
    matchFile(file: string | URL | Deno.FsFile): Promise<MagicBytesMetaWithWeight | null>;
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
  ```
- ```ts
  interface MagicBytesMetaWithWeight extends MagicBytesMeta {
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

## ✍️ Example
