import { supportType } from '../type'
import { captitalize, isArray, isObject } from '../helper/utils'

export type typeOptions = {
  arrayOf?: any,
  objectOf?: Object,
}

function getType(type: any): [string, {}] {
  // type now support either 'string' or String
  let typeName = ''
  const options: typeOptions = {};

  if (isArray(type)) {
    typeName = 'array';
    const arrayOf = type[0].name ?
    type[0].name.toLowerCase && type[0].name.toLowerCase() :
    type[0].toLowerCase && type[0].toLowerCase();
    if (supportType[captitalize(arrayOf)]) {
      options.arrayOf = captitalize(arrayOf);
    } else {
      throw new Error(`Kya: ${captitalize(typeName) || type} is not supported.`);
    }
  } else if (isObject(type)) {
    typeName = 'object';
    const objectKeys = Object.keys(type);
    if (objectKeys.length > 0) {
      options.objectOf = type;
    }
  } else {
    typeName = type.name ?
    type.name.toLowerCase && type.name.toLowerCase() :
    type.toLowerCase && type.toLowerCase();
  }

  if (supportType[captitalize(typeName)]) {
    return [typeName, options];
  } else {
    throw new Error(`Kya: ${captitalize(typeName) || type} is not supported.`);
  }
}

export default getType;
