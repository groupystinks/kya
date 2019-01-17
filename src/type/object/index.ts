import messages from './messages';
import getType from '../../helper/getType';
import { isObject, captitalize } from '../../helper/utils';
import * as types from '../index';

interface ObjectType {
  type: Function;
}

type typeOptions = {
  objectOf: Object,
};

const ObjectType: ObjectType = {
  type(errorMsg?: String, options: typeOptions = { objectOf: {}}) {
    return function (target: {}) {
      if (!isObject(target)) { return {message: errorMsg} || {message: messages.object}; }

      if (options.objectOf === undefined) {
        return false;
      }

      const isAllRight = Object.keys(options.objectOf).every(key => {
        const fieldSchmea = options.objectOf[key];
        let fieldType = fieldSchmea.type;
        if (!fieldType) {
          fieldType = fieldSchmea;
        }
        const [typeName, childtypeOptions] = getType(fieldType);
        return types.supportTypeValidate[captitalize(typeName)].type(errorMsg, childtypeOptions)(target[key]) === false;
      });

      if (isAllRight) {
        return false;
      }

      return {message: errorMsg} || {message: messages.object};
    };
  }
};

export default ObjectType;