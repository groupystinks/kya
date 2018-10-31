export default function isBypassing(BYPASS_FLAG: Boolean) {
  if (typeof BYPASS_FLAG !== 'undefined') { return BYPASS_FLAG; }
  return true;
}

// tslint:disable-next-line:no-any
export function isEmpty(arg: Object | Array<any>) {
  if (
    Object.prototype.toString.call(arg) === '[object Object]' ||
    Object.prototype.toString.call(arg) === '[object Array]'
  ) {
    return Object.keys(arg).length === 0;
  }

  if (
    typeof arg === 'number' ||
    typeof arg === 'boolean'
  ) {
    return false;
  }
  
  // null, undefined, NaN, "", false
  return !arg;
}