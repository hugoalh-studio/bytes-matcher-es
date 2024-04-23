# Bytes Matcher (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh-studio/bytes-matcher-es](https://img.shields.io/github/v/release/hugoalh-studio/bytes-matcher-es?label=hugoalh-studio/bytes-matcher-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/bytes-matcher-es")](https://github.com/hugoalh-studio/bytes-matcher-es)
[![JSR: @hugoalh/bytes-matcher](https://img.shields.io/jsr/v/@hugoalh/bytes-matcher?label=JSR%20@hugoalh/bytes-matcher&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/bytes-matcher")](https://jsr.io/@hugoalh/bytes-matcher)
[![NPM: @hugoalh/bytes-matcher](https://img.shields.io/npm/v/@hugoalh/bytes-matcher?label=@hugoalh/bytes-matcher&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/bytes-matcher")](https://www.npmjs.com/package/@hugoalh/bytes-matcher)

An ES (JavaScript & TypeScript) module to determine whether the bytes is match the specify signature.

## 🎯 Target

- Bun >= v1.1.0
- Cloudflare Workers
- Deno >= v1.42.0
  > **🛡️ Require Permission**
  >
  > *N/A*
- NodeJS >= v16.13.0

## 🔰 Usage

### Via JSR With `node_modules`

> **🎯 Supported Target**
>
> - Bun
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - Bun
      ```sh
      bunx jsr add @hugoalh/bytes-matcher[@${Tag}]
      ```
    - NPM
      ```sh
      npx jsr add @hugoalh/bytes-matcher[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm dlx jsr add @hugoalh/bytes-matcher[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn dlx jsr add @hugoalh/bytes-matcher[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/bytes-matcher";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via JSR With Specifier

> **🎯 Supported Target**
>
> - Deno

1. Import at the script:
    ```ts
    import ... from "jsr:@hugoalh/bytes-matcher[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With `node_modules`

> **🎯 Supported Target**
>
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - NPM
      ```sh
      npm install @hugoalh/bytes-matcher[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm add @hugoalh/bytes-matcher[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn add @hugoalh/bytes-matcher[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/bytes-matcher";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With Specifier

> **🎯 Supported Target**
>
> - Bun
> - Deno

1. Import at the script:
    ```ts
    import ... from "npm:@hugoalh/bytes-matcher[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via Remote Import

> **🎯 Supported Target**
>
> - Deno

1. Import at the script:
    ```ts
    /* Via GitHub Raw (Require Tag) */
    import ... from "https://raw.githubusercontent.com/hugoalh-studio/bytes-matcher-es/${Tag}/mod.ts";
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

## 🧩 API

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
