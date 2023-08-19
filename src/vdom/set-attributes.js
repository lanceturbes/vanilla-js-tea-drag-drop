import setAttribute from "./set-attribute.js";

/**
 * @param {HTMLElement} $node
 * @param {Object.<string, string | Function>} attributes
 * @param {Object.<string, string | Function>} [oldAttributes]
 */
export function setAttributes($node, attributes, oldAttributes = {}) {
  for (const [key, value] of Object.entries(oldAttributes)) {
    if (!(key in attributes)) {
      removeAttribute($node, key, value);
    }
  }
  for (const [key, value] of Object.entries(attributes)) {
    if (oldAttributes[key] === value) {
      continue;
    }
    setAttribute($node, key, value, oldAttributes[key]);
  }
}

export default setAttributes;
