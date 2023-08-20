import renderElement from "./render-element.js";
import setAttributes from "./set-attributes.js";

/**
 * @param {HTMLElement} $node
 * @see https://github.com/matvp91/lolvdom/blob/master/lib/vdom/diff.js
 */
export function patchDOM($node, tree, prevTree) {
  // If next tree is missing, delete node
  if (tree === undefined || tree === null) {
    $node.remove();
    return;
  }

  // If next tree is string and does not match previous tree, replace
  if (
    typeof tree === "string" ||
    typeof prevTree === "string" ||
    typeof tree === "number" ||
    typeof prevTree === "number"
  ) {
    if (tree !== prevTree) {
      $node.replaceWith(renderElement(tree));
    }
    return;
  }

  // If next tree is different tag, replace
  if (tree.type !== prevTree.type) {
    $node.replaceWith(renderElement(tree));
    return;
  }

  // If only children are different, replace them
  prevTree.children.forEach((prevChild, i) => {
    patchDOM($node.childNodes[i], tree.children[i], prevChild);
  });

  // Append any extra elements that were new vs last time
  for (const child of tree.children.slice(prevTree.children.length)) {
    $node.append(renderElement(child));
  }

  setAttributes($node, tree.attributes, prevTree.attributes);
}

export default patchDOM;
