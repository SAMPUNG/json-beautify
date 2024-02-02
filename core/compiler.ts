const PREVIOUS_SCOPE = ['{', '[', ',', ':']

let cursor = 0
let indent = ''
let pieces: string[] = []
let quotes = 0
let result = ''
let scoped = false

function addSpaceAfter(char: string) {
  pieces.splice(cursor + 1, 1, char, ' ')
}

function breakAfter(char: string) {
  pieces.splice(cursor + 1, 1, char, '\n', indent)
}

function breakBefore(char: string) {
  pieces.splice(cursor + 1, 1, '\n', indent, char)
}

function changeIndent(count: number) {
  indent = new Array(count).fill(' ').join('')
}

function checkScopePrev() {
  if (quotes === 0) {
    quotes = 1
    scoped = true
    return
  }

  if (!scoped) {
    quotes += 1
    scoped = true
    return
  }

  const prev = pieces[cursor]
  const checked = PREVIOUS_SCOPE.includes(prev)
  quotes += Number(checked)
  scoped = quotes % 2 === 1
}

function clearScope() {
  quotes = 0
  scoped = false
}

function compile(source: string) {
  reset(source)

  while (~cursor) {
    const char = pieces[cursor--]

    if (char === '"') {
      checkScopePrev()

      if (quotes % 4 === 0) {
        breakBefore(char)
        continue
      }
    }

    if (scoped) {
      continue
    }

    if (char === ':') {
      quotes += quotes === 0 ? 2 : 0
      addSpaceAfter(char)
      pieces.splice(cursor + 1, 1, ': ')
    }

    if (char === ',') {
      clearScope()
      addSpaceAfter(char)
      continue
    }

    if (char === '{' || char === '[') {
      clearScope()
      breakAfter(char)
      changeIndent(indent.length - 2)
      continue
    }

    if (char === '}' || char === ']') {
      breakBefore(char)
      changeIndent(indent.length + 2)
      continue
    }
  }

  /** Remove Empty Line */
  result = pieces.join('').replace(/\n\s+\n/g, '\n')

  return result
}

function reset(source: string) {
  cursor = source.length - 1
  indent = ''
  pieces = source.split('')
  quotes = 0
  result = ''
  scoped = false
}

export default compile
