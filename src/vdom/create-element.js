export function createElement(type, attributes, ...children) {
  return { type, attributes: attributes ? attributes : {}, children };
}

export default createElement;
