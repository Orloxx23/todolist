import React from "react";
import { TodoContext } from "../TodoContext";
import { useEffect } from "react";

export default function TipCard() {
  const { setOpenTipModal, todoSelected } = React.useContext(TodoContext);
  const [lineas, setLineas] = React.useState([]);

  const onCancel = () => {
    setOpenTipModal((prevState) => !prevState);
    setLineas([]);
  };

  useEffect(() => {
    const lines = todoSelected.tip.split("\n");
    setLineas(lines);
  }, [todoSelected]);

  return (
    <div className="FormModal">
      <div className="FormCard">
        <div className="card-head">
          <h2 style={{textTransform: 'capitalize'}}>{todoSelected.text}</h2>
          <i className="fa-solid fa-xmark" onClick={onCancel}></i>
        </div>
        <div className="card-body">
          {lineas?.map((linea, index) => (
            <div key={index}>
              {linea}
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
