import React, {Component} from "react";

import './new-task-form.css'
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {

    static defaultProps = {
        onItemAdded: () => {
        }

    }

    static propTypes = {
        onItemAdded: PropTypes.func
    }

    state = {
        label: ''
    }

    labelChange = (e) => {

        this.setState({
            label: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault();
        this.props.onItemAdded(this.state.label);
        this.setState({
            label: ''
        })

    }


    render() {
        return (
            <form onSubmit={this.submit}>
                <input className="new-todo"
                       placeholder="What needs to be done?"
                       autoFocus
                       onChange={this.labelChange}
                       value={this.state.label}/>
            </form>

        );
    }
};

