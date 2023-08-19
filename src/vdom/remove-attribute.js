import getEventTypeFromAttributeName from "./get-event-type-from-attribute-name.js";
import isEventAttribute from "./is-event-attribute.js";

/**
 * @param {HTMLElement} $node
 * @param {string} attributeName
 * @param {string | Function} value
 */
export function removeAttribute($node, attributeName, value) {
  if (isEventAttribute(attributeName)) {
    const eventName = getEventTypeFromAttributeName(attributeName);
    $node.removeEventListener(eventName, value);
  } else {
    $node.removeAttribute(attributeName);
  }
}

export default removeAttribute;
