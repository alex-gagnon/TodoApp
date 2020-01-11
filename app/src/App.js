import React, {Component} from 'react'
import './stylesheets/App.css'
import Todo from './components/Todo'


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
