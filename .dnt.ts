import {
	getMetadataFromConfig,
	invokeDenoNodeJSTransformer
} from "DNT";
const configJSR = await getMetadataFromConfig("jsr.jsonc");
await invokeDenoNodeJSTransformer({
	assetsCopy: [
		"LICENSE.md",
		"README.md"
	],
	entrypoints: configJSR.exports,
	generateDeclarationMap: true,
	metadata: {
		name: "@hugoalh/bytes-matcher",
		version: configJSR.version,
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
		repository: {
			type: "git",
			url: "git+https://github.com/hugoalh-studio/bytes-matcher-es.git"
		},
		scripts: {
		},
		engines: {
			node: ">=16.13.0"
		},
		private: false,
		publishConfig: {
			access: "public"
		}
	},
	outputDirectory: "npm",
	outputDirectoryPreEmpty: true
});
