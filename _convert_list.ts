import { stringify as csvStringify, type DataItem } from "STD/csv/stringify.ts";
import { parse as yamlParse } from "STD/yaml/parse.ts";
const fileName = "magic_bytes_list";
const data = yamlParse(await Deno.readTextFile(`${fileName}.yml`));
await Deno.writeTextFile(`${fileName}.tsv`, `${csvStringify(data as DataItem[], {
	columns: [
		"category",
		"extensions",
		"mimes",
		"name",
		"signature",
		"variant"
	],
	separator: "\t"
})}`);
await Deno.writeTextFile(`${fileName}.json`, `${JSON.stringify(data, undefined, "\t")}\n`);
