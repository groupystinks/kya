export const isFuntion = (arg: {}) => typeof arg === 'function';
export const isString = (arg: {}) => Object.prototype.toString.call(arg) === '[object String]';
export const isBoolean = (arg: {}) => Object.prototype.toString.call(arg) === '[object Boolean]';
export const isObject = (arg: {}) => Object.prototype.toString.call(arg) === '[object Object]';
