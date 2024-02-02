function parse(source: unknown, indent: number = 0) {
  if (source === undefined || source === null) {
    return 'null'
  }

  const prefix = new Array(indent).fill(' ').join('')

  if (typeof source === 'string') {
    return `"${source}"`
  }

  if (typeof source === 'boolean') {
    return source.toString()
  }

  if (typeof source === 'number') {
    return source.toFixed(6)
  }

  if (typeof source !== 'object') {
    return '{ "Error": "Invalid Parameters" }'
  }

  const results: string[] = []
  if (Array.isArray(source)) {
    results.push('[', ']')
    for (let i = source.length - 1, j = 0; i > -1; i--, j++) {
      const comma = j === 0 ? '' : ','
      const record =
        parse(source[i], indent + 2)
          .split('\n')
          .map((subitem) => subitem)
          .join('\n') + comma
      results.splice(1, 0, record)
    }
    return results.join('')
  }

  results.push('{', prefix + '}')
  Object.entries(source).forEach(([key, value], index) => {
    const comma = index === 0 ? '' : ','
    const record = `  ${prefix}"${key}": ${parse(value, indent + 2)}${comma}`
    results.splice(1, 0, record)
  })

  return results.join('\n')
}

export default parse
