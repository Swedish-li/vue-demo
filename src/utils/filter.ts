const toString = Object.prototype.toString
const isUndefined = (ob: unknown) => typeof ob === 'undefined'
const isObject = (value: unknown): value is { [key: string]: unknown } =>
  value !== null && typeof value === 'object'
const isFunction = (value: unknown): value is Function =>
  typeof value === 'function'
const hasCustomToString = (obj: any) =>
  isFunction(obj.toString) && obj.toString !== toString

const isArray = (arr: unknown): arr is Array<unknown> =>
  Array.isArray(arr) || arr instanceof Array

function comparator(actual: unknown, expected: unknown) {
  if (isUndefined(actual)) {
    // No substring matching against `undefined`
    return false
  }

  if (actual === null || expected === null) {
    // No substring matching against `null`; only match against `null`
    return actual === expected
  }

  if (isObject(expected) || (isObject(actual) && !hasCustomToString(actual))) {
    // Should not compare primitives against objects, unless they have custom `toString` method
    return false
  }
  const actualVal = String(actual).toLowerCase()
  const expectedVal = String(expected).toLowerCase()
  return actualVal.indexOf(expectedVal) !== -1
}

export function deepCompare(actual: unknown, expected: string): boolean {
  if (isArray(actual)) {
    return actual.some((item) => deepCompare(item, expected))
  }

  if (isObject(actual)) {
    for (let key in actual) {
      // Under certain, rare, circumstances, key may not be a string and `charAt` will be undefined
      // See: https://github.com/angular/angular.js/issues/15644
      const actualVal = <unknown>actual[key]
      if (
        key.charAt &&
        key.charAt(0) !== '$' &&
        deepCompare(actual[key], expected)
      ) {
        return true
      }
    }
    return false
  }
  if (isFunction(actual)) return false

  return comparator(actual, expected)
}
