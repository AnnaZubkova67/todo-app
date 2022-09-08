import React from "react";

import Task from "../task";
import './task-list.css'

const TaskList = ({ todos, onDeleted, onToggleDone }) => {

    const elements = todos.map((item) => {
        const { id, style, ...itemProps } = item;
        return (
                <Task key = {id}
                      style = {style}
                      {...itemProps }
                onDeleted={() => onDeleted(id)}
                      onToggleDone={() => onToggleDone(id)}
                />
        );
    });

    return (
        <ul className="todo-list">
            { elements }
        </ul>
    );
}

export default TaskList;