import { IConstruct } from "./construct";

/**
 * Given an object, converts all keys to PascalCase given they are currently in camel case.
 * @param obj The object.
 */
export function capitalizePropertyNames(construct: IConstruct, obj: any): any {
  obj = construct.node.resolve(obj);

  if (typeof(obj) !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(x => capitalizePropertyNames(construct, x));
  }

  const newObj: any = { };
  for (const key of Object.keys(obj)) {
    const value = obj[key];

    const first = key.charAt(0).toUpperCase();
    const newKey = first + key.slice(1);
    newObj[newKey] = capitalizePropertyNames(construct, value);
  }

  return newObj;
}

/**
 * Turns empty arrays/objects to undefined (after evaluating tokens).
 */
export function ignoreEmpty(construct: IConstruct, o: any): any {
  o = construct.node.resolve(o); // first resolve tokens, in case they evaluate to 'undefined'.

  // undefined/null
  if (o == null) {
    return o;
  }

  if (Array.isArray(o) && o.length === 0) {
    return undefined;
  }

  if (typeof(o) === 'object' && Object.keys(o).length === 0) {
    return undefined;
  }

  return o;
}