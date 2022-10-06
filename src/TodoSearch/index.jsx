import React from "react";
import { TodoContext } from "../TodoContext";

function TodoSearch() {
  const { setSearchValue } = React.useContext(TodoContext);

  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <input
      type="search"
      className="input"
      placeholder="Buscar tarea..."
      onChange={onSearchValueChange}
    />
  );
}

export { TodoSearch };
