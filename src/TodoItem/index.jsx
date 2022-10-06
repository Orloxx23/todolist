import React from "react";

function TodoItem(props) {
  return (
    <div className="TodoItem">
      <div className="completado">
        <label className="container">
          <input defaultChecked={props.completed} type="checkbox"  onClick={props.changeStateTodos}/>
          <div className="checkmark"></div>
        </label>
      </div>
      <div className="cuerpo-contenido">
        <p style={props.completed ? {textDecoration: 'line-through'} : {}}>{props.text}</p>
        <i className="fa-solid fa-trash" onClick={props.onDelete}></i>
      </div>
    </div>
  );
}

export { TodoItem };
