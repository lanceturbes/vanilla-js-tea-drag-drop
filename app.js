import { swapItems } from "@/core";
import { createApp, createElement as h } from "@/vdom";
import { sampleView } from "@/views";

// "state" object to keep track of things that should not cause re-renders
const data = { draggedIndex: null };

function init() {
  return {
    count: 0,
    itemList: [
      { id: 0, name: "Apple" },
      { id: 1, name: "Banana" },
      { id: 2, name: "Cherry" },
    ],
  };
}

function update(msg, model) {
  switch (msg.type) {
    case "INCREMENT":
      return { ...model, count: model.count + 1 };

    case "DRAG_END":
      return msg.payload === null || msg.payload === undefined
        ? model
        : {
            ...model,
            itemList: swapItems(model.itemList, data.draggedIndex, msg.payload),
          };

    default:
      return model;
  }
}

function view(model, dispatch) {
  return h(
    "div",
    null,
    Array.from({ length: 1000 }, () => sampleView(model, dispatch))
  );
}

const $root = document.getElementById("root");
createApp({ init, update, view }).mount($root);
