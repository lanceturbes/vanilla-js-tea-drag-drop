import { createElement as h } from "@/lib/vdom";
import { getTitleFromPathname } from "@/bin/utils";

export function layoutView(model, dispatch, children) {
  return h("div", null, [
    h("header", null, [
      h("h1", null, [getTitleFromPathname(model.activeRoute)]),
      h("ul", null, [
        h("li", null, [
          h(
            "a",
            {
              class: isLinkActive(model.activeRoute, "/")
                ? "header--link-active"
                : "header--link",
              onclick: (e) => {
                e.preventDefault();
                dispatch({ type: "CHANGE_ROUTE", payload: "/" });
              },
            },
            ["Home"]
          ),
          h(
            "a",
            {
              class: isLinkActive(model.activeRoute, "/about")
                ? "header--link-active"
                : "header--link",
              onclick: (e) => {
                e.preventDefault();
                dispatch({ type: "CHANGE_ROUTE", payload: "/about" });
              },
            },
            ["About"]
          ),
        ]),
      ]),
    ]),
    h("main", null, children),
  ]);
}

function isLinkActive(activeRoute, pathname) {
  return activeRoute === pathname;
}

export default layoutView;
