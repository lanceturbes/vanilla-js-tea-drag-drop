import setAttributes from "./set-attributes.js";

export function renderElement(element) {
  if (typeof element === "string" || typeof element === "number") {
    return document.createTextNode(String(element));
  }

  const { type, attributes, children } = element;
  const $el = document.createElement(type);

  setAttributes($el, attributes);

  for (const child of children) {
    $el.appendChild(renderElement(child));
  }

  return $el;
}

export default renderElement;
