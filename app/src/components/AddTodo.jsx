import React, {Component} from 'react'


class AddTodo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            initialPos: {x: 0, y: 0},
            dragging: false,
            rel: null   // position relative to cursor
        }

        this.selector = React.createRef()

        this.handleAdd = this.handleAdd.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.onMouseDown = this.onMouseDown.bind(this)
    }

    /**
     * Prompt user for text.
     * If text is not empty, add to ToDo list.
     */
    handleAdd() {
        const text = prompt("Add a TODO!")
        if (text) {
            this.props.onAdd(text)
        }
    }

    componentDidMount() {
        const rect = this.selector.current.getBoundingClientRect()
        console.log(rect)
    }

    /**
     * Ensures no higher z-index elements get in the way.
     * @param {*} state 
     */
    componentDidUpdate(state) {
        if (this.state.dragging && !state.dragging) {
            document.addEventListener('mousemove', this.onMouseMove)
            document.addEventListener('mouseup', this.onMouseUp)
        } else if (!this.state.dragging && state.dragging) {
            document.removeEventListener('mousemove', this.onMouseMove)
            document.removeEventListener('mouseup', this.onMouseUp)
        }
    }
    
    /**
     * Calculate relative position to the cursor and set dragging=true
     * @param {Event} e 
     */
    onMouseDown(e) {
        // only left mouse button
        if (e.button !== 0) return
        let pos = this.selector
        this.setState({
            dragging: true,
            rel: {
                x: e.pageX - pos.left,
                y: e.PageY - pos.top
            }
        })
        e.stopPropagation()
        e.preventDefault()
    }

    /**
     * 
     * @param {Event} e 
     */
    onMouseUp(e) {
        this.setState({
            dragging: false,
        })
        e.stopPropagation()
        e.preventDefault()
    }

    /**
     * 
     * @param {Event} e
     */
    onMouseMove(e) {
        if(!this.state.dragging) return
        this.setState({
            pos: {
                x: e.pageX - this.state.rel.x,
                y: e.pageY - this.state.rel.y
            }
        })
        e.stopPropagation()
        e.preventDefault()
    }

    render() {
        return (
            <div className="todo-btn"
            ref={this.selector}
            onMouseDown={this.onMouseDown}>
                <span className="circle plus"
                onClick={this.handleAdd}></span>
            </div>
        )
    }
}

export default AddTodo