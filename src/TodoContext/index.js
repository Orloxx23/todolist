import React from "react";

import { useLocalStorage } from "./useLocalStorage";
import axios from "axios";

const TodoContext = React.createContext();

function TodoProvider(props) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

  const { item: hide, saveItem: saveHide } = useLocalStorage("hide", false);

  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [openTipModal, setOpenTipModal] = React.useState(false);
  const [loadingAddTodo, setLoadingAddTodo] = React.useState(false);

  const [todoSelected, setTodoSelected] = React.useState({});

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = todos;

  const hideCompleted = () => {
    saveHide(!hide);
  };

  if (!searchValue.length >= 1) {
    if (!hide) {
      searchedTodos = todos;
    } else {
      searchedTodos = todos.filter((todo) => !todo.completed);
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
      searchedTodos = todos.filter((todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLowerCase();
        return todoText.includes(searchText);
      });
    }
  }

  const addTodo = async (text) => {
    const newTodos = [...todos];
    let tip = "";

    setLoadingAddTodo(true);

    let data = JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 1,
      // max_tokens: 150,
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that motivates your users to carry out their tasks and advises them to increase their productivity and carry them out successfully. you are direct and concise. you never greet your users.",
        },
        {
          role: "user",
          content: `como puedo hacer esta tarea: '${text}'`,
        },
      ],
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
      },
      data: data,
    };

    const response = await axios.request(config);

    tip = response.data.choices[0].message.content;

    newTodos.push({
      id: Date.now(),
      completed: false,
      text: text,
      tip: tip,
      seen: false,
    });

    saveTodos(newTodos);

    setLoadingAddTodo(false);
    if (openModal) setOpenModal(false);
  };

  const changeStateTodos = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const showTip = (todo) => {
    setTodoSelected(todo);
    const todoIndex = todos.findIndex((ttodo) => ttodo.id === todo.id);
    const newTodos = [...todos];
    if (!newTodos[todoIndex].seen) newTodos[todoIndex].seen = true;
    saveTodos(newTodos);
    setOpenTipModal(true);
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
        openTipModal,
        setOpenTipModal,
        showTip,
        addTodo,
        hide,
        hideCompleted,
        loadingAddTodo,
        todoSelected,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };
