import { useState } from "react";

export const Creator = (props) => {
  const [newItemText, setNewItemText] = useState("");

  const updateNewTextValue = (event) => {
    setNewItemText(event.target.value);
  };

  const createNewTodo = () => {
    props.callback(newItemText);
    setNewItemText("");
  };

  return (
    <div className="my-1">
      <input
        className="form-control"
        value={newItemText}
        onChange={updateNewTextValue}
      />
      <button className="btn btn-primary mt-1" onClick={createNewTodo}>
        Add
      </button>
    </div>
  );
};
