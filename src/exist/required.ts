function kya_required(composedFunc: Function, errorMsg?: String) {
  return function withRequired(arg: any) {
    return composedFunc(arg, false, errorMsg)
  }
}

export default kya_required
