#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import "https://deno.land/x/dotenv@v3.2.0/load.ts";
// console.log(
//   await configAsync({ export: true, path: "./.env", example: "./.env.example" })
// );

await dev(import.meta.url, "./main.ts");
