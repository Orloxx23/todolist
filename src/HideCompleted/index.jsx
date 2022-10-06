import React, { useContext } from "react";
import { TodoContext } from "../TodoContext";

function HideCompleted() {
  const { hidden, hideCompleted } = useContext(TodoContext);
  return (
    <div className="HideCompleted">
      <p onClick={() => hideCompleted()}>
        <i className={hidden ? ("fa-regular fa-eye") : ("fa-regular fa-eye-slash")}></i> {hidden ? ("Ver") : ("Ocular")} completadas
      </p>
    </div>
  );
}

export { HideCompleted };
