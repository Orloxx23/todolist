import React from 'react'

function TodoList(props) {
  return (
    <div className="TodoList">
      {props.children}
    </div>
  )
}

export { TodoList }
