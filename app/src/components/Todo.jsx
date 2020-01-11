import React, {Component} from 'react'
import AddTodo from './AddTodo.jsx'

const Todos = props => (
    <li id={"todo-" + props.todo.id}>
        <span>{props.todo.text}</span>
        <input type="checkbox" 
        checked={props.todo.checked} 
        onChange={props.onToggle}/>
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
    }

    addTodo(text) {
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
        <div class="todo-section">
            <div className="todo-section__content">            
                <div className="todo-header">
                    <h1>Todos</h1>
                </div>
                <div className="todo-content">
                    <div className="todo-content__counters">                    
                        <div className="todo-counter">
                            <h2>Todo Count</h2>
                            <span>{this.state.todos.length || 0}</span>
                        </div>
                        <div className="todo-counter">
                            <h2>Unchecked Count</h2>
                            <span>{this.state.todos.filter(todo => !todo.checked).length}</span>
                        </div>
                    </div>
                </div>
                <div className="todo-content">
                    <ul className="todo-content__todo-list">
                    {this.state.todos.map(todo => 
                        <Todos className="todo-item"
                        key={"todo" + todo.id}
                        todo={todo}
                        onDelete={() => this.deleteTodo(todo.id)}
                        onToggle={() => this.toggleChecked(todo.id)} />
                    )}
                    </ul>
                </div>
                <AddTodo onAdd={this.addTodo} />
            </div>
        </div>
        )
    }
}

export default Todo;