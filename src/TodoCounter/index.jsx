import React from "react";
import { TodoContext } from "../TodoContext";

function TodoCounter() {
  const { totalTodos, completedTodos } = React.useContext(TodoContext);

  const faltantes = totalTodos - completedTodos;

  const mostrarTexto = () => {
    if(totalTodos === 0){
      return 'No hay tareas pendientes';
    }

    if(faltantes === 1){
      return `Falta ${faltantes} tarea por completar`;
    }
    
    if(faltantes > 1){
      return `Faltan ${faltantes} tareas por completar`;
    }

    if(completedTodos === totalTodos){
      return 'Completaste todas tus tareas 🥳'; 
    }
  }

  return (
    <div className="TodoCounter">
      <h2>{mostrarTexto()}</h2>
    </div>
  );
}

export { TodoCounter };
