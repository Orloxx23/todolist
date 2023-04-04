import React from "react";
import "./App.css";

import { CreateTodoButton } from "../CreateTodoButton";
import { TodoCounter } from "../TodoCounter";
import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";
import { TodoSearch } from "../TodoSearch";
import { Loader } from "../Loader";
import { TodoContext } from "../TodoContext";
import { Modal } from "../Modal";
import { FormCard } from "../FormCard";
import { HideCompleted } from "../HideCompleted";
import { Footer } from "../Footer";
import TipCard from "../TipCard";

function AppUI() {
  const {
    error,
    loading,
    searchedTodos,
    changeStateTodos,
    deleteTodo,
    openModal,
    showTip,
    openTipModal,
  } = React.useContext(TodoContext);

  return (
    <React.Fragment>
      <div className="contenedor">
        <div className="cuerpo">
          <div className="cuerpo-primer-contenedor">
            <TodoSearch />
            <div className="cositas">
              <TodoCounter />
              <CreateTodoButton />
            </div>
          </div>
          {!loading && <HideCompleted />}
          <TodoList>
            {error && <p>Algo anda mal...</p>}
            {loading && (
              <div className="center">
                <Loader />
              </div>
            )}
            {!loading && !searchedTodos.length && (
              <div className="center">
                <h2>No hay nada por aquí 🤷‍♂️</h2>
              </div>
            )}

            {searchedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                text={todo.text}
                completed={todo.completed}
                seen={todo.seen}
                changeStateTodos={() => changeStateTodos(todo.id)}
                onDelete={() => deleteTodo(todo.id)}
                onSeen={() => showTip(todo)}
              />
            ))}
          </TodoList>
        </div>
      </div>
      <Footer />

      {!!openModal && (
        <Modal>
          <FormCard />
        </Modal>
      )}

      {!!openTipModal && (
        <Modal>
          <TipCard />
        </Modal>
      )}
    </React.Fragment>
  );
}

export { AppUI };
