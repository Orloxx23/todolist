import React, { useContext } from "react";
import { TodoContext } from "../TodoContext";

function HideCompleted() {
  const {  hide, hideCompleted } = useContext(TodoContext);
  return (
    <div className="HideCompleted">
      <p onClick={hideCompleted}>
        <i className={hide ? ("fa-regular fa-eye") : ("fa-regular fa-eye-slash")}></i> {hide ? ("Ver") : ("Ocultar")} completadas
      </p>
    </div>
  );
}

export { HideCompleted };
