import { createElement as h } from "@/lib/vdom";

export function homeView(model, dispatch) {
  return h("div", null, [
    h("p", null, ["Home"]),
    h("button", { onclick: () => dispatch({ type: "INCREMENT" }) }, [
      `Count: ${model.count}`,
    ]),
  ]);
}

export default homeView;
