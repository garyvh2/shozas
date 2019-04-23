/**
 * Deep Compare
 * @param { * } value first entry value
 * @param { * } other second entry value
 * @param { Boolean } sorted Sort any array before deep comparison
 */
export const deepCompare = (value, other, sorted = false) => {
    /**
     * Compare possible primitives
     * Object.is works like `===` but additionally differes positive from negative values
     * https://is.gd/tEiQVP
     * I.E:
     *  Object.is(-0, 0) // False
     *  -0 === 0 // True
     */
    if (Object.is(value, other)) return true;
    /**
     * Check if either value is undefined or the constructor is different for each value
     * given the case return false
     */
    if (!value || !other || value.constructor !== other.constructor) return false;
    /**
     * Check Object and Array deep comparisons
     */
    switch (value.constructor) {
      case Array:
        /**
         * Check if both values have the same amount of items
         * if they don't immediatelly omit the comparison and return false
         */
        if (value.length === other.length) {
          return deepArrayCompare(value, other, sorted);
        }
        return false;
      case Object:
        /**
         * Check if both values have the same amount of keys
         * if they don't immediatelly omit the comparison and return false
         */
        if (Object.keys(value).length === Object.keys(other).length) {
          return deepObjectCompare(value, other, sorted);
        }
        return false;
    }
    return false;
  };
  /**
   * Deep Object Compare
   * @param { * } value first entry value
   * @param { * } other second entry value
   *
   * 'deepArrayCompare(Object.keys(value), Object.keys(other), sorted)'
   * This checks that both objects have the same keys
   * I.E:
   *  deepArrayCompare(Object.keys({ a: 1, b: 2, c:3 }), Object.keys({ a: 10, b: 22, c: 54 }), true) // True
   *  deepArrayCompare(Object.keys({ a: 1, b: 2, c:3 }), Object.keys({ g: 1, f: 2, d: 3 }), true) // False
   *
   * 'Object.keys(value).every(key => deepCompare(value[key], other[key]))'
   * This iterates on each key of the object over a 'every' comparison and performs a deepCompare on both values
   *
   */
  const deepObjectCompare = (value, other) => deepArrayCompare(Object.keys(value), Object.keys(other), true) && Object.keys(value).every(key => deepCompare(value[key], other[key]));
  /**
   * Deep Array Compare
   * @param { * } value first entry value
   * @param { * } other second entry value
   * @param { Boolean } sorted Sort any array before deep comparison
   *
   * '(sorted && value.sort(), sorted && other.sort(), ...)'
   * This manages the optional sorting through Comma Operator
   * https://is.gd/9Ad5AH
   *
   * 'value.every((item, index) => deepCompare(item, other[index]))'
   * This performs the deepComparison of values between both arrays
   */
  const deepArrayCompare = (value, other, sorted) => (sorted && value.sort(), sorted && other.sort(), value.every((item, index) => deepCompare(item, other[index])));
