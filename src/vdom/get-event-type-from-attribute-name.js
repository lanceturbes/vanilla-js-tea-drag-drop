/**
 * @param {string} attributeName
 */
export function getEventTypeFromAttributeName(attributeName) {
  return attributeName.slice(2).toLowerCase();
}

export default getEventTypeFromAttributeName;
