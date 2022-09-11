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
        timeFromCreation: 'less than a minute',
        valueInput: this.props.label

    }
    labelChange = (e) => {

        this.setState({
            valueInput: e.target.value
        })
    }

    submit = (e) => {
        e.preventDefault();
        this.props.editingTask(this.state.valueInput, this.props.id);

    }


    render() {
        const {
            label, onDeleted, onToggleDone,
            done, style, timeOfCreation,
            onToggleEditing, editing
        } = this.props;

        setInterval(() => {
            this.setState({
                timeFromCreation: formatDistanceToNow(new Date(timeOfCreation))
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
            <form onSubmit={this.submit}>
                <input className={'new-todo'} type='text'
                       onChange={this.labelChange}
                       value={this.state.valueInput}/>
            </form>

        )
        const viewTask = (
            <div className='view'>
                <input className={classInput} type='checkbox'
                       onClick={onToggleDone}/>
                <label onClick={onToggleDone}>
                    <span className='description'>{label}</span>
                    <span className="created">{this.state.timeFromCreation}</span>
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
