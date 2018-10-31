function kya_required(composedFunc: Function, errorMsg?: String) {
  return function withRequired(arg: {}) {
    return composedFunc(arg, false, errorMsg);
  };
}

export default kya_required;
