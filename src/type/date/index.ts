import { isDate } from '../../helper/utils';

const DateType = {
  type(errorMsg?: String) {
    return (target: {}) => {
      if (isDate(target)) {return false; }

      return {message: errorMsg};
    };
  },

};

export default DateType;
