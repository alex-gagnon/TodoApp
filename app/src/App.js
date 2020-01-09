import React from 'react';
import './App.css';
import Todo from './components/Todo'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
    }
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
