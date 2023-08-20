import createElement from "../vdom/create-element.js";

export function homeView(model, dispatch) {
  return (
    <div>
      <p>Home</p>
      <button onclick={() => dispatch({ type: "INCREMENT" })}>
        Count: {model.count}
      </button>
    </div>
  );
}

export default homeView;
