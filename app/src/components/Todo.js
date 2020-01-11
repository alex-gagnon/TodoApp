import React from 'react'

const Todo = props => (
    <li>
        <span>{props.todo.text}</span>
        <input type="checkbox" checked={props.todo.checked} onChange={props.onToggle}/>
        <button onClick={props.onDelete}>delete</button>
    </li>
)

export default Todo;