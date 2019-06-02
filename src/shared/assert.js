/**
 * @param {boolean} booleanExpr
 * @param {string=} msg
 */
const assert = (booleanExpr, msg) => {
  if (!booleanExpr && __DEV__) {
    throw new Error(msg)
  }
}

export default assert
