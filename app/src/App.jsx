import React, {Component} from 'react'
import './App.css'
import Todo from './components/Todo/Todo'


class App extends Component {
  render() {
    return (
      <main className="container">
        <Todo />
      </main>
    )
  }
}

export default App;
