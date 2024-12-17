import { PGlite } from "npm:@electric-sql/pglite";

const db = new PGlite("./example.db");
const result = await db.query("select 'Hello world' as message;");
console.log(result);
// -> { rows: [ { message: "Hello world" } ] }