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

    case "TOGGLE_THEME":
      const isDarkMode =
        document.documentElement.getAttribute("data-theme") === "dark";
      const nextTheme = isDarkMode ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("theme", nextTheme);
      return model;

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

const lastTheme = localStorage.getItem("theme");
const isDarkModePreferred = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;
if (lastTheme === "light" || lastTheme === "dark") {
  document.documentElement.setAttribute("data-theme", lastTheme);
} else {
  if (isDarkModePreferred) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
}

const $root = document.getElementById("root");
createApp({ init, update, view }).mount($root);
