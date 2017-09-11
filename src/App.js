import React, { Component } from "react"
import AddTodo from "./AddTodo"
import Todo from "./Todo"
import "./App.css"
import API from "todo-mvc-service"

class App extends Component {
  state = {
    todos: [],
  }

  componentDidMount() {
    API.fetch("/todos")
      .then(res => res.json())
      .then(todos => this.setState({ todos: todos }))
      .catch(err => console.error(err))
  }

  createTodo = async title => {
    const res = await API.fetch("/todos", {
      method: "POST",
      body: {
        title: title,
        complete: false,
      },
    })
    const item = res.json()
    this.setState({
      todos: [item, ...this.state.todos],
    })
  }

  toggleTodo = async (id, isComplete) => {
    let res
    try {
      res = await API.fetch("/todos/" + id, {
        method: "PUT",
        body: {
          complete: !isComplete,
        },
      })
    } catch (err) {
      console.error(err)
      return
    }
    const updatedItem = res.json()
    const { todos } = this.state
    const index = todos.findIndex(todo => todo.id === id)
    const newItem = { ...todos[index], ...updatedItem }
    const newTodos = todos
      .slice(0, index)
      .concat(newItem)
      .concat(todos.slice(index + 1))
    this.setState({
      todos: newTodos,
    })
  }

  deleteTodo = async id => {
    let res
    try {
      res = await API.fetch("/todos/" + id, {
        method: "DELETE",
      })
    } catch (err) {
      console.error(err)
      return
    }
    const updatedItem = res.json()
    const { todos } = this.state
    const index = todos.findIndex(todo => todo.id === id)
    const newItem = { ...todos[index], ...updatedItem }
    const newTodos = todos
      .slice(0, index)
      .concat(newItem)
      .concat(todos.slice(index + 1))
    this.setState({
      todos: newTodos,
    })
  }

  render() {
    const { todos } = this.state
    return (
      <div className="Todos">
        <h2>Todo List</h2>
        <AddTodo handleAdd={this.createTodo} />
        <div>
          {todos
            .filter(todo => !todo._deleted)
            .map(todo => (
              <Todo
                {...todo}
                key={todo.id}
                handleDelete={() => this.deleteTodo(todo.id)}
                handleToggle={() => this.toggleTodo(todo.id, todo.complete)}
              />
            ))}
        </div>
      </div>
    )
  }
}

export default App
