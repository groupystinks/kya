import messages from './messages';

interface BooleanType {
  type: Function
}

const BooleanType: BooleanType = {
  type(errorMsg?: String) {
    return function (target: any) {
      if (typeof target === 'boolean') {
        return false
      }
      return errorMsg || messages.boolean
    }
  }
}

export default BooleanType