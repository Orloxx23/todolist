import React from "react";
import { TodoContext } from "../TodoContext";

function CreateTodoButton() {
  const { setOpenModal } = React.useContext(TodoContext);
  return (
    <div className="nueva">
      <button className="icon-btn" aria-label="Crear nueva tarea" aria-labelledby="Crear nueva tarea" onClick={() => setOpenModal(prevState => !prevState)}>
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

export { CreateTodoButton };
