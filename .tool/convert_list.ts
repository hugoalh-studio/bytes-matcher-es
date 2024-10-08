import {
	stringify as csvStringify,
	type DataItem
} from "STD/csv/stringify";
import { parse as yamlParse } from "STD/yaml/parse";
const fileName = "magic_bytes_list";
const data = yamlParse(await Deno.readTextFile(`asset/${fileName}.yml`));
await Deno.writeTextFile(`asset/${fileName}.tsv`, `${csvStringify(data as DataItem[], {
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
await Deno.writeTextFile(`asset/${fileName}.json`, `${JSON.stringify(data, undefined, "\t")}\n`);
