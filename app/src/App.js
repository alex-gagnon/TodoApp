import React, {Component} from 'react'
import './App.css'
import Todo from './components/Todo'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
    }

    this.addTodo = this.addTodo.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.toggleChecked = this.toggleChecked.bind(this)
  }

  addTodo() {
    this.setState({
      todos: [...this.state.todos, ]
    })
  }

  deleteTodo() {

  }

  toggleChecked() {

  }

  render() {
    return (
      <div>
        <h1>Todos</h1>
        <ul>
          {this.state.todos.map(todo => <Todo todo={todo} />)}
        </ul>
      </div>
    )
  }
}

export default App;
