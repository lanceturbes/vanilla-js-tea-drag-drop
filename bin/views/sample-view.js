import { createElement as h } from "@/vdom";
import data from "../data.js";

export function sampleView(model, dispatch) {
  return h("div", null, [
    h("button", { onclick: () => dispatch({ type: "INCREMENT" }) }, [
      `Count: ${model.count}`,
    ]),
    h(
      "ul",
      null,
      model.itemList.map((item, i) =>
        h(
          "li",
          {
            draggable: "true",
            id: `item-${item.id}`,
            ondragstart: () => {
              data.draggedIndex = i;
            },
            ondrop: (event) => {
              event.preventDefault();
              dispatch({ type: "DRAG_END", payload: i });
            },
            ondragenter: (event) => {
              event.preventDefault();
            },
            ondragover: (event) => {
              event.preventDefault();
              event.dataTransfer.effectAllowed = "move";
            },
          },
          [item.name]
        )
      )
    ),
  ]);
}

export default sampleView;
