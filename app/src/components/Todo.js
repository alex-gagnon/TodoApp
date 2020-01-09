import React from 'react'

const Todo = props => (
    <li>
        <span>{props.todo.text}</span>
        <input type="checkbox" checked={props.todo.checked} />
        <button>delete</button>
    </li>
)

export default Todo;