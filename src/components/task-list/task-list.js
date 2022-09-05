import React from "react";

import Task from "../task";
import './task-list.css'

const TaskList = ({ todos }) => {

    const elements = todos.map((item) => {
        const { id, style, ...itemProps } = item;
        if (style === 'editing') {
            return (
                <li key={id} className={style}>
                    <Task {...itemProps } />
                    <input type="text" className="edit" defaultValue="Editing task" />
                </li>
            );
        }

        return (
            <li key={id} className={style}>
                <Task {...itemProps } />
            </li>
        );
    });

    return (
        <ul className="todo-list">
            { elements }
        </ul>
    );
}

export default TaskList;