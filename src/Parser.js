export class Parser {
  constructor(config) {
    this.config = config
  }

  parse(text) {
    text = text.split("")
    const context = []
    let current = null
    let previous = {}
    let bold = false
    let italic = false

    while (text.length) {
      const char = text.shift()
      const type = Parser.getType(char, context)

      if (type !== previous.type) {
        current = { type, text: "", bold, italic }
        context.push(current)
      }

      if (type === "bold") {
        bold = !bold
      }
      if (type === "italic") {
        italic = !italic
      }

      current.text += char

      previous = current
    }

    return context
  }

  format(context) {
    context = context.filter((item) => ["word"].includes(item.type))
    let out = ""
    for (const item of context) {
      if (item.type === "word") {
        const classes = [
          item.type,
          item.bold ? "bold" : null,
          item.italic ? "italic" : null,
        ]
          .join(" ")
          .trim()
        out += ` <span class="${classes}">${item.text}</span>`
      }
    }
    return out.trim()
  }

  static getType(
    char,
    context /*this will probably be needed at some point? */
  ) {
    if (char === "*") {
      return "bold"
    }
    if (char === "_") {
      return "italic"
    }
    if (char === " ") {
      return "space"
    }

    return "word"
  }
}
