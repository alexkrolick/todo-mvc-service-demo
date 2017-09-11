import React, { Component } from "react"
import Icon from "./Icon"
import "./AddTodo.css"

class AddTodo extends Component {
  state = {
    title: "",
  }

  onClickAdd = () => {
    this.props.handleAdd(this.state.title)
    this.setState({ title: "" })
  }

  onChangeTitle = e => {
    this.setState({ title: e.target.value })
  }

  render() {
    const isButtonDisabled = this.state.title === ""
    return (
      <div className="AddTodo">
        <input
          type="text"
          className="AddTodoInput"
          value={this.state.title}
          onChange={this.onChangeTitle}
        />
        <button
          className="AddTodoBtn"
          onClick={isButtonDisabled ? () => {} : this.onClickAdd}
          disabled={isButtonDisabled}
        >
          <Icon icon="plus" /> Add
        </button>
      </div>
    )
  }
}

export default AddTodo
