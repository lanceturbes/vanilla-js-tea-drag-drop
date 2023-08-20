import patchDOM from "./patch-dom.js";
import renderElement from "./render-element.js";

/**
 * @see https://github.com/dwyl/learn-elm-architecture-in-javascript
 */
export function createApp({ init, update, view }) {
  return {
    getState() {
      return model;
    },
    getVDOMTree() {
      return currentView;
    },
    mount($node) {
      let model = init();
      let currentView = view(model, dispatch);

      console.log("INITIAL STATE:", model);

      function dispatch(msg) {
        model = update(msg, model);
        const newView = view(model, dispatch);
        patchDOM($node.firstChild, newView, currentView);
        currentView = newView;
      }

      $node.replaceChildren(renderElement(currentView));

      // Notify store of route changes when user goes back/forward in browser
      window.addEventListener("popstate", () => {
        dispatch({ type: "POP_URL", payload: location.pathname });
      });
    },
  };
}

export default createApp;
