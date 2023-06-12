import React from "react";

function TodoItem(props) {
  return (
    <div className="TodoItem">
      <div className="completado">
        <label className="container">
          <input
            defaultChecked={props.completed}
            type="checkbox"
            onClick={props.changeStateTodos}
            aria-labelledby="Casilla de revisión"
          />
          <div className="checkmark"></div>
        </label>
      </div>
      <div className="cuerpo-contenido">
        <p style={props.completed ? { textDecoration: "line-through" } : {}}>
          {props.text}
        </p>
        <div className="TodoItem-buttons">
          {/* <i className={`${props.seen ? "fa-regular" : "fa-solid"} fa-lightbulb tip-button ${props.seen && "tip-button-seen"}`} onClick={props.onSeen}></i> */}
          <i className="fa-solid fa-trash" onClick={props.onDelete}></i>
        </div>
      </div>
    </div>
  );
}

export { TodoItem };
