import React from "react";

import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

  const {
    item: hide,
    saveItem: saveHide,
  } = useLocalStorage("hide", []);

  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = todos;

  const [hidden, setHidden] = React.useState(false);

  const hideCompleted = () => {
    setHidden(!hidden);
    saveHide(!hidden);
  };

  if (!searchValue.length >= 1) {
    if(!hide){
      searchedTodos = todos;
    } else {
      searchedTodos = todos.filter(todo => !todo.completed)
    }
  } else {
    let newSearchedTodos = [];
    if (hide) {
      newSearchedTodos = todos.filter((todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
      });

      searchedTodos = newSearchedTodos.filter((todo) => !todo.completed);
    } else {
      newSearchedTodos = todos.filter((todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
      });

      searchedTodos = newSearchedTodos.filter((todo) => todo.completed);
    }
  }

  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text: text,
    });
    saveTodos(newTodos);
  };

  const changeStateTodos = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        changeStateTodos,
        deleteTodo,
        openModal,
        setOpenModal,
        addTodo,
        hidden,
        hideCompleted,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
