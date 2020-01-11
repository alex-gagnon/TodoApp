import React, {Component} from 'react'

const Todos = props => (
    <li id={"todo-" + props.todo.id}>
        <span>{props.todo.text}</span>
        <input type="checkbox" checked={props.todo.checked} onChange={props.onToggle}/>
        <button onClick={props.onDelete}>delete</button>
    </li>
)

let id = 0

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
    }

    this.addTodo = this.addTodo.bind(this)
    this.toggleChecked = this.toggleChecked.bind(this)
  }

  addTodo() {
    const text = prompt("Add a TODO!")
    this.setState({
      todos: [
        ...this.state.todos, 
        {id: id++, text: text, checked: false}
      ]
    })
  }

  deleteTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  toggleChecked(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo
        return {
          id: todo.id,
          text: todo.text,
          checked: !todo.checked,
        }
      })
    })
  }

  render() {
    return (
      <div>
        <h1>Todos</h1>
        <div>
          <h2>Todo Count</h2>          
          <span>{this.state.todos.length || 0}</span>
        </div>
        <div>
          <h2>Unchecked Count</h2>
          <span>{this.state.todos.filter(todo => !todo.checked).length}</span>
        </div>
        <button onClick={this.addTodo}>Add Todo</button>
        <ul>
          {this.state.todos.map(todo => 
            <Todos key={"todo" + todo.id}
            todo={todo}
            onDelete={() => this.deleteTodo(todo.id)}
            onToggle={() => this.toggleChecked(todo.id)} />
          )}
        </ul>
      </div>
    )
  }
}

export default Todo;