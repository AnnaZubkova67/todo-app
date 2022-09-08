import React, {Component} from "react";
import {formatDistanceToNow} from 'date-fns'

import "./task.css";


export default class Task extends Component {

    state = {
        newDate: 'less than a minute'
    }


    render() {
        const {label, onDeleted, onToggleDone, done, style, timeOfCreation, onToggleEditing, editing} = this.props;

        setInterval(() => {
            this.setState({
                newDate: formatDistanceToNow(new Date(timeOfCreation))
            })
        }, 30000)

        let className = `${style}`;
        if (done) {
            className += ' completed';
        }
        if (editing) {
            className += ' edit';
        }

        return (
            <li className={className}>
                <div className='view'
                     onClick={onToggleDone}>
                    {/*<input className="toggle" type="checkbox" defaultChecked={this.state.checked}/>*/}
                    <input className="toggle" type="checkbox"/>
                    <label>
                    <span className='description'>{label}</span>
                        <span className="created">{this.state.newDate}</span>
                    </label>
                    <button className="icon icon-edit"
                    onClick={onToggleEditing}/>
                    <button className="icon icon-destroy"
                            onClick={onDeleted}/>
                </div>
            </li>
        );
    }
}
