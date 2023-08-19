import getEventTypeFromAttributeName from "./get-event-type-from-attribute-name.js";
import isEventAttribute from "./is-event-attribute.js";
import removeAttribute from "./remove-attribute.js";

/**
 * @param {HTMLElement} $node
 * @param {string} attributeName
 * @param {string | Function} value
 * @param {string | Function} [previousValue]
 */
export function setAttribute($node, attributeName, value, previousValue) {
  if (isEventAttribute(attributeName)) {
    if (previousValue) {
      removeAttribute($node, attributeName, previousValue);
    }
    const eventName = getEventTypeFromAttributeName(attributeName);
    $node.addEventListener(eventName, value);
  } else {
    $node.setAttribute(attributeName, value);
  }
}

export default setAttribute;
