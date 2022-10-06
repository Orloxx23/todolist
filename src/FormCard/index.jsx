import React from "react";
import { TodoContext } from "../TodoContext";

function FormCard() {
  const { setOpenModal, addTodo } = React.useContext(TodoContext);

  const [newTodoValue, setNewTodoValue] = React.useState("");

  const [error, setError] = React.useState(false);

  const onChangeInput = (event) => {
    setNewTodoValue(event.target.value);
  };

  const onCancel = () => {
    setOpenModal((prevState) => !prevState);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (newTodoValue.length > 0) {
      addTodo(newTodoValue);
      onCancel();
      
    } else {
        setError(true);
    }
  };

  return (
    <div className="FormModal">
      <div className="FormCard">
        <div className="card-head">
          <h2>Nueva tarea</h2>
          <i className="fa-solid fa-xmark" onClick={onCancel}></i>
        </div>
        <form onSubmit={onSubmit} className="form">
          <input
            placeholder="Crear tarea"
            className="input-form"
            name="text"
            type="text"
            onChange={onChangeInput}
            autoComplete="off"
          />
          {error && <p style={{marginTop: 20, textAlign: "end"}}>Algo anda mal 😐</p>}
          <button type="submit" class="btn">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}

export { FormCard };
