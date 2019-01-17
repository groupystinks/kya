export const isFuntion = (arg: {}) => typeof arg === 'function';
export const isString = (arg: {}) => Object.prototype.toString.call(arg) === '[object String]';
export const isNumber = (arg: {}) => Object.prototype.toString.call(arg) === '[object Number]';
export const isDate = (arg: {}) => Object.prototype.toString.call(arg) === '[object Date]';
export const isArray = (arg: {}) => Object.prototype.toString.call(arg) === '[object Array]';
export const isBoolean = (arg: {}) => Object.prototype.toString.call(arg) === '[object Boolean]';
export const isObject = (arg: {}) => Object.prototype.toString.call(arg) === '[object Object]';
export function captitalize(str: string): string {
  if (!isString(str)) { return ''; }
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}
