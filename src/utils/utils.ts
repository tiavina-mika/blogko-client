import { Attributes } from "parse";

/**
 * get the server url
 * we need it to connect to the parse server or an server side api (ex: via axios)
 * NOTE: this function should be called after defining the window.LOCAL, window.PREPROD, window.PROD first
 * @returns
 */
export const getServerUrl = (): string => {
  if ((window as any).LOCAL) {
    const SERVER_PORT = 8088;
    const location = window.location;
    return location.protocol + '//' + location.hostname + ':' + SERVER_PORT;
  }

  if ((window as any).PREPROD) {
    return 'https://preprod-url.com';
  }

  return 'https://prod-url.com';
};

/**
 * check if it's null ( 0, '', null, undefined, {}, [] )
 * @param item
 * @returns {boolean}
 */
export const isNull = (item: string): boolean => {
  // NOTE : typeof null = 'object', typeof undefined = 'undefined'
  // see Loose Equality Comparisons With == at ( https://www.sitepoint.com/javascript-truthy-falsy )
  const typeOfValue = typeof item;
  switch (typeOfValue) {
    case 'string':
      return item.trim() === '';
    case 'object':
      return Object.is(item, null) || Object.values(item).every(val => isNull(val));
    case 'number':
      return !item;
    default:
      return item == null;
  }
};

/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export const setValue = (parseObject: Attributes, name: string, value: any): void => {
  const oldValue = parseObject.get(name);
  if (isNull(value)) {
    parseObject.unset(name);
  } else if (oldValue !== value) {
    parseObject.set(name, value);
  }
};

/**
 * @param object
 * @param {array|Set} names
 * @returns {*}
 */
/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export const filter = (object: Record<string, any>, names: Record<string, any>): Record<string, any> => {
  return Object.keys(object)
    .filter(key => (names.has ? names.has(key) : names.includes(key)))
    .reduce((obj, key) => {
      (obj as any)[key] = object[key];
      return obj;
    }, {});
};

/**
 * . null or undefined values aren't set
 * . a value is set only when it's different
 * @param parseObject
 * @param values
 * @param {Array|Set} names (optional), ensures we only set the right properties
 */
export const setValues = (parseObject: Attributes, values: Record<string, any>, names: Record<string, any>): void => {
  if (names) {
    values = filter(values, names);
  }
  for (const key in values) {
    /* eslint-disable-next-line no-prototype-builtins */
    if (!values.hasOwnProperty(key)) {
      /* eslint-disable-next-line no-continue */
      continue;
    }
    const value = values[key];
    setValue(parseObject, key, value);
  }
};

const isCleanedString = (string: string | Record<string, any> | number): boolean => {
  return !!(!string || typeof string !== 'string' || (string && string.trim().length === 0));
};

export const capitalizeFirstLetter = (string: string): string => {
  if (isCleanedString(string)) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};