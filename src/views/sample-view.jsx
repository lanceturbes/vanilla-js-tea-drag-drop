import createElement from "../vdom/create-element.js";
import data from "../data.js";

export function sampleView(model, dispatch) {
  return (
    <div>
      <button onclick={() => dispatch({ type: "INCREMENT" })}>
        Count: {model.count}
      </button>
      <ul>
        {model.itemList.map((item, i) => (
          <li
            draggable="true"
            id={`item-${item.id}`}
            ondragstart={() => {
              data.draggedIndex = i;
            }}
            ondrop={(event) => {
              event.preventDefault();
              dispatch({ type: "DRAG_END", payload: i });
            }}
            ondragenter={(event) => {
              event.preventDefault();
            }}
            ondragover={(event) => {
              event.preventDefault();
              event.dataTransfer.effectAllowed = "move";
            }}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default sampleView;
