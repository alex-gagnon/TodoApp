import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './AddTodo.css'


class AddTodo extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            relX: 0,
            relY: 0,
            x: props.x,
            y: props.y,
            hold: {
                // timeout started on mousedown, triggers start of hold
                starter: 0,
                // wait time to recognize hold (ms)
                delay: 400,
                // flag if mousedown is hold
                active: false,
                // flag if add handler should be run
                stop: true,
            }
        }
        this.gridX = props.gridX || 1;
        this.gridY = props.gridY || 1;
        this.handleAdd = this.handleAdd.bind(this)        
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
    }

    static propTypes = {
        onMove: PropTypes.func,
        onStop: PropTypes.func,
        x: PropTypes.number,
        y: PropTypes.number,
        gridX: PropTypes.number,
        gridY: PropTypes.number,
    }

    /**
     * Prompt user for text.
     * If text is not empty, add to ToDo list.
     */
    handleAdd(e) {
        let hold = {...this.state.hold}
        if (!hold.stop) return;
        const text = prompt("Add a TODO!")
        if (text) {
            this.props.onAdd(text)
        }
        e.preventDefault()
    }

    // Handle <div> dragging for add todo button.

    onStart(e) {
        const ref = ReactDOM.findDOMNode(this.handle);
        const body = document.body;
        const box = ref.getBoundingClientRect();
        this.setState({
            relX: e.pageX - (box.left + body.scrollLeft - body.clientLeft),
            relY: e.pageY - (box.top + body.scrollTop - body.clientTop)
        });
    }

    onMove(e) {
        const x = Math.trunc((e.pageX - this.state.relX) / this.gridX) * this.gridX;
        const y = Math.trunc((e.pageY - this.state.relY) / this.gridY) * this.gridY;
        if (x !== this.state.x || y !== this.state.y) {
            this.setState({
                x,
                y
            });
            this.props.onMove && this.props.onMove(this.state.x, this.state.y);
        }        
    }

    onMouseDown(e) {
        if (e.button !== 0) return;
        this.onStart(e);
        /**
         * No immediate action, set hold starter to wait for
         * predetermined delay, and then begin a hold
         */
        let hold = {...this.state.hold}
        hold.starter = setTimeout(() => {
            hold.starter = null;
            hold.active = true;

            // Hold-only operations
            // At the end, as they perform oddly if placed here

        }, hold.delay);
        
        this.setState({
            hold
        })
        document.addEventListener('mousemove', this.onMouseMove);
        document.addEventListener('mouseup', this.onMouseUp);
        e.preventDefault();
        
        
    }

    onMouseUp(e) {
        let hold = {...this.state.hold}

        /**
         * If mouse is clicked, before hold starter runs,
         * then cancel the hold starter and do the click
         */
        if (hold.starter) {
            clearTimeout(hold.starter)

            // Click-only operations
            hold.stop = true;
        /**
         * If mouse was being held, end the hold.
         */
        } else if (hold.active) {
            hold.active = false;
            
            // Prevent click-only operation
            hold.stop = false
        }        
        this.setState({
            hold
        })

        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
        this.props.onStop && this.props.onStop(this.state.x, this.state.y);
        e.preventDefault();
    }

    onMouseMove(e) {
        this.onMove(e);
        e.preventDefault();
    }

    onTouchStart(e) {
        this.onStart(e.touches[0]);
        document.addEventListener('touchmove', this.onTouchMove, {passive: false});
        document.addEventListener('touchend', this.onTouchEnd, {passive: false});
        e.preventDefault();
    }

    onTouchMove(e) {
        this.onMove(e.touches[0]);
        e.preventDefault();
    }

    onTouchEnd(e) {
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
        this.props.onStop && this.props.onStop(this.state.x, this.state.y);
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <div className="todo-btn"
                ref={div => this.handle = div}
                onMouseDown={this.onMouseDown}
                onTouchStart={this.onTouchStart}
                style={{
                    position: "absolute",
                    left: this.state.x,
                    top: this.state.y,
                    touchAction: 'none'
                }}>
                    <span className="circle plus"
                    onClick={this.handleAdd}></span>
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default AddTodo