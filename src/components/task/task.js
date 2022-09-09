import React, {Component} from "react";
import {formatDistanceToNow} from 'date-fns'

import "./task.css";
import PropTypes from "prop-types";


export default class Task extends Component {

    static defaultProps = {
        label: ''
    }

    static propTypes = {
        label: PropTypes.node
    }


    state = {
        newDate: 'less than a minute',
        valueInput: this.props.label

    }
    onLabelChange = (e) => {

        this.setState({
            valueInput: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.valueInput, this.props.id)
        this.props.editingTask(this.state.valueInput, this.props.id);

    }


    render() {
        const {label, onDeleted, onToggleDone, done, style, timeOfCreation, onToggleEditing, editing} = this.props;

        setInterval(() => {
            this.setState({
                newDate: formatDistanceToNow(new Date(timeOfCreation))
            })
        }, 30000)

        let className = `${style}`;
        let classInput = `toggle`
        if (done) {
            className += ' completed';
            classInput += ' checked'
        }
        if (editing) {
            className += ' edit';
        }
        const newEditingTask = (
            <form onSubmit={this.onSubmit}>
                <input className={'new-todo'} type ='text'
                       onChange={this.onLabelChange}/>
            </form>

        )
        const viewTask = (
                <div className='view'>
                    <input className={classInput} type='checkbox' />
                    <label onClick={onToggleDone}>
                        <span className='description'>{label}</span>
                        <span className="created">{this.state.newDate}</span>
                    </label>
                    <button className="icon icon-edit"
                            onClick={onToggleEditing}/>
                    <button className="icon icon-destroy"
                            onClick={onDeleted}/>
                </div>
        )

        return (
            <li className={className}>
                {editing ? newEditingTask : viewTask}
            </li>
        );
    }
}
