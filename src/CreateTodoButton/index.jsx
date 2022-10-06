import React from "react";
import { TodoContext } from "../TodoContext";

function CreateTodoButton() {
  const { setOpenModal } = React.useContext(TodoContext);
  return (
    <div className="nueva">
      <button className="icon-btn" onClick={() => setOpenModal(prevState => !prevState)}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

export { CreateTodoButton };
