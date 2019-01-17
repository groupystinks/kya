export type SupportType = String | Number | Boolean | Array<{}> | Date | Object;

const supportTypes = [
  'String', 'Number', 'Date',
  'Boolean', 'Array', 'Object',
];

const supportType = {
  String: String,
  Number: Number,
  Boolean: Boolean,
  Array: Array,
  Date: Date,
  Object: Object,
};

import array from './array';
import boolean from './boolean';
import number from './number';
import object from './object';
import string from './string';
import date from './date';

const supportTypeValidate = {
  String: string,
  Number: number,
  Boolean: boolean,
  Array: array,
  Date: date,
  Object: object,
};

export {
  array, boolean, number,
  object, string, date,
  supportTypes, supportType, supportTypeValidate,
};
