import createElement from "../vdom/create-element.js";
import getTitleFromPathname from "../utils/get-title-from-pathname.js";

export function layoutView(model, dispatch, children) {
  return (
    <div>
      <header>
        <h1>{getTitleFromPathname(model.activeRoute)}</h1>
        <ul>
          <li>
            <a
              class={
                isLinkActive(model.activeRoute, "/")
                  ? "header--link-active"
                  : "header--link"
              }
              onclick={(e) => {
                e.preventDefault();
                dispatch({ type: "CHANGE_ROUTE", payload: "/" });
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a
              class={
                isLinkActive(model.activeRoute, "/about")
                  ? "header--link-active"
                  : "header--link"
              }
              onclick={(e) => {
                e.preventDefault();
                dispatch({ type: "CHANGE_ROUTE", payload: "/about" });
              }}
            >
              About
            </a>
          </li>
        </ul>
        <button onclick={() => dispatch({ type: "TOGGLE_THEME" })}>
          Toggle Theme
        </button>
        <main>{children}</main>
      </header>
    </div>
  );
}

function isLinkActive(activeRoute, pathname) {
  return activeRoute === pathname;
}

export default layoutView;
