export default function isBypassing(bypass_flag: Boolean) {
  if (typeof bypass_flag !== 'undefined') { return bypass_flag }
  else { return true}
}

export function isEmpty(arg: any) {
  if (Object.prototype.toString.call(arg) === '[object Array]') {
    return arg.length === 0
  }

  if (Object.prototype.toString.call(arg) === '[object Object]') {
    return Object.keys(arg).length === 0
  }

  if (
    typeof arg === 'number' ||
    typeof arg === 'boolean'
  ) {
    return false
  }
  

  // null, undefined, NaN, "", false
  return !arg
}