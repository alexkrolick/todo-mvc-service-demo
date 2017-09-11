import React from "react"
import Icon from "./Icon"
import "./Todo.css"

const Todo = ({ title, createdAt, complete, handleDelete, handleToggle }) => {
  const date = new Date(createdAt).toLocaleString()
  return (
    <div className={`Todo ${complete ? "complete" : "incomplete"}`}>
      <Icon icon="check" className="ToggleTodoBtn" onClick={handleToggle} />
      <div className="TodoTitle" onClick={handleToggle}>
        {title}
      </div>
      <div className="TodoDate" onClick={handleToggle}>
        {date}
      </div>
      <Icon icon="trash" className="DeleteTodoBtn" onClick={handleDelete} />
    </div>
  )
}

export default Todo
