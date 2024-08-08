import { build as invokeDNT } from "DNT";
import { copy as fsCopy } from "STD/fs/copy";
import { emptyDir } from "STD/fs/empty-dir";
import { ensureDir } from "STD/fs/ensure-dir";
import {
	walk as fsWalk,
	type WalkEntry
} from "STD/fs/walk";
const fsPathsSnapshot: WalkEntry[] = await Array.fromAsync(fsWalk("."));
const npmOutputDirectory = "./npm";
await ensureDir(npmOutputDirectory);
await emptyDir(npmOutputDirectory);
await invokeDNT({
	compilerOptions: {
		target: "Latest"
	},
	declaration: "inline",
	declarationMap: true,
	entryPoints: [
		{
			kind: "export",
			name: "./magic-bytes",
			path: "./magic_bytes.ts"
		},
		{
			kind: "export",
			name: "./matcher",
			path: "./matcher.ts"
		},
		{
			kind: "export",
			name: ".",
			path: "./mod.ts"
		}
	],
	esModule: true,
	mappings: {},
	outDir: "./npm",
	package: {
		name: "@hugoalh/bytes-matcher",
		version: "0.2.0",
		description: "A module to determine whether the bytes is match the specify signature.",
		keywords: [
			"bytes",
			"matcher"
		],
		homepage: "https://github.com/hugoalh-studio/bytes-matcher-es#readme",
		bugs: {
			url: "https://github.com/hugoalh-studio/bytes-matcher-es/issues"
		},
		license: "MIT",
		author: "hugoalh",
		type: "module",
		repository: {
			type: "git",
			url: "git+https://github.com/hugoalh-studio/bytes-matcher-es.git"
		},
		engines: {
			node: ">=16.13.0"
		},
		private: false,
		publishConfig: {
			access: "public",
			"git-tag-version": false,
			"lockfile-version": 2
		}
	},
	scriptModule: false,
	shims: {
		blob: false,
		deno: true,
		prompts: false,
		timers: false,
		undici: false,
		weakRef: false,
		webSocket: false
	},
	test: false,
	typeCheck: false
});
await Deno.remove(`${npmOutputDirectory}/src`, { recursive: true });
for (const { path } of fsPathsSnapshot) {
	if (
		/^LICENSE[^\\\/]*\.md$/.test(path) ||
		/^README[^\\\/]*\.md$/.test(path)
	) {
		await fsCopy(path, `${npmOutputDirectory}/${path}`, {
			overwrite: true,
			preserveTimestamps: true
		});
	}
}
await new Deno.Command("pwsh", {
	args: ["-NonInteractive", "-Command", "$ErrorActionPreference = 'Stop'; npm publish --dry-run"],
	cwd: `${Deno.cwd()}/${npmOutputDirectory}`,
	stderr: "inherit",
	stdin: "inherit",
	stdout: "inherit"
}).output();
