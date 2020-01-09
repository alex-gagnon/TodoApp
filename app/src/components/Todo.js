const Todo = props => (
    <li>
        <span>{props.text}</span>
        <input type="checkbox" />
        <button>delete</button>
    </li>
)

export default Todo;