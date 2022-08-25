import "core-js/stable"
import "regenerator-runtime/runtime"
import { Parser } from "./Parser"

const parser = new Parser()
window.parser = parser
;[
  "Hello world",
  "*Hello* world",
  "*_Hello* world_",
  "*_Hello_* world",
  "Hello            world",
  "           Hello            world               ",
  
].forEach((txt) => {
  const context = parser.parse(txt)
  const formatted = parser.format(context)
  console.log(context, formatted)
})
