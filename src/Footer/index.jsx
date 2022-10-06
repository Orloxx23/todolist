import React from "react";

function Footer() {
  return (
    <div className="AppFooter">
      <p>Orlando Mina</p>
      <div className="icons">
        <a
          href="https://github.com/Orloxx23/todolist"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-solid fa-code"></i>
        </a>
        <a
          href="https://github.com/Orloxx23"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-github"></i>
        </a>
        <a
          href="https://www.linkedin.com/in/orlandomm/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa-brands fa-linkedin"></i>
        </a>
      </div>
    </div>
  );
}

export { Footer };
