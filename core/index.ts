import compile from './compiler'
import parse from './parser'

function beautify(json: string | Object) {
  if (typeof json === 'string') {
    return compile(json)
  }
  return parse(json)
}

export { beautify, compile as beautifyJSON, parse as beautifyRecord }
