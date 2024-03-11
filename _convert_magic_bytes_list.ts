import { stringify as csvStringify } from "https://deno.land/std@0.219.1/csv/stringify.ts";
import { dirname as pathDirname } from "https://deno.land/std@0.219.1/path/dirname.ts";
import { fromFileUrl as pathFromFileUrl } from "https://deno.land/std@0.219.1/path/from_file_url.ts";
import { join as pathJoin } from "https://deno.land/std@0.219.1/path/join.ts";
import { parse as yamlParse } from "https://deno.land/std@0.219.1/yaml/parse.ts";
const root = pathDirname(pathFromFileUrl(import.meta.url));
const fileName = "magic_bytes_list";
const data = yamlParse(await Deno.readTextFile(pathJoin(root, `${fileName}.yml`)));
const dataStringify = JSON.stringify(data, undefined, "\t");
//@ts-ignore Lazy to assign type.
await Deno.writeTextFile(pathJoin(root, `${fileName}.tsv`), `${csvStringify(data.map((_) => {
	return {
		..._,
		extensions: _.extensions.join(", "),
		mimes: _.mimes.join(", "),
		signature: JSON.stringify(_.signature)
	}
}), {
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
await Deno.writeTextFile(pathJoin(root, `${fileName}.json`), `${dataStringify}\n`);
