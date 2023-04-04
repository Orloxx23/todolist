import React from "react";
import { TodoContext } from "../TodoContext";

function FormCard() {
  const { setOpenModal, addTodo, loadingAddTodo } =
    React.useContext(TodoContext);

  const [newTodoValue, setNewTodoValue] = React.useState("");

  const [error, setError] = React.useState(false);

  const onChangeInput = (event) => {
    setNewTodoValue(event.target.value);
  };

  const onCancel = () => {
    if (loadingAddTodo) return;
    setOpenModal((prevState) => !prevState);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (newTodoValue.length > 0) {
      addTodo(newTodoValue);
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
          {error && (
            <p style={{ marginTop: 20, textAlign: "end" }}>Algo anda mal 😐</p>
          )}
          {!loadingAddTodo ? (
            <button type="submit" className="btn">
              Crear
            </button>
          ) : (
            <div className="loaderaddtodo">
              <p>Generando Tips...</p>
              <div className="loader-add">
                <div className="loader__circle-add"></div>
                <div className="loader__circle-add"></div>
                <div className="loader__circle-add"></div>
                <div className="loader__circle-add"></div>
                <div className="loader__circle-add"></div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>  
  );
}

export { FormCard };
