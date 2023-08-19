import { swapItems } from "@/lib/core";
import { createApp } from "@/lib/vdom";
import { aboutView, homeView, layoutView } from "@/bin/views";
import data from "./data.js";

const validRoutes = new Set(["/", "/about"]);

function init() {
  return {
    count: 0,
    activeRoute: (() => {
      const isPathValid = validRoutes.has(location.pathname);
      if (isPathValid) {
        return location.pathname;
      }
      window.location.replace("/");
      return "/";
    })(),
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

    case "CHANGE_ROUTE":
      history.pushState({}, "", msg.payload);
      return { ...model, activeRoute: msg.payload };

    case "POP_URL":
      return { ...model, activeRoute: msg.payload };

    default:
      return model;
  }
}

function view(model, dispatch) {
  return layoutView(model, dispatch, [
    model.activeRoute === "/"
      ? homeView(model, dispatch)
      : model.activeRoute === "/about"
      ? aboutView(model, dispatch)
      : "",
  ]);
}

const $root = document.getElementById("root");
createApp({ init, update, view }).mount($root);
