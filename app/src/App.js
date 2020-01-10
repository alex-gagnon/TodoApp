import React, {Component} from 'react'
import './App.css'
import Todo from './components/Todo'

let id = 0

class App extends Component {
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
          <span>{0}</span>
        </div>
        <button onClick={this.addTodo}>Add Todo</button>
        <ul>
          {this.state.todos.map(todo => 
            <Todo todo={todo}
            onDelete={() => this.deleteTodo(todo.id)} />
          )}
        </ul>
      </div>
    )
  }
}

export default App;
