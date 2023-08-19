/**
 * @param {string} attributeName
 */
export function isEventAttribute(attributeName) {
  return attributeName.startsWith("on");
}

export default isEventAttribute;
