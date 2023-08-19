import { createElement as h } from "@/lib/vdom";

export function aboutView() {
  return h("div", null, [h("p", null, ["About"])]);
}

export default aboutView;
