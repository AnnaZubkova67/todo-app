import React from "react";

import Task from "../task";
import './task-list.css'
import PropTypes from "prop-types";

const TaskList = ({todos, onDeleted, onToggleDone, onToggleEditing, editingTask}) => {

    const elements = todos.map((item) => {
        const {id, style, timeOfCreation, editing, ...itemProps} = item;
        return (
            <Task key={id}
                  style={style}
                  editing={editing}
                  id={id}
                  timeOfCreation={timeOfCreation}
                  {...itemProps}
                  onDeleted={() => onDeleted(id)}
                  onToggleDone={() => onToggleDone(id)}
                  onToggleEditing={() => onToggleEditing(id)}
                  editingTask={editingTask}
            />
        );
    });

    return (
        <ul className="todo-list">{elements}</ul>
    );
}

TaskList.defaultProps = {
    onDeleted: () => {},
    onToggleDone: () => {},
    onToggleEditing: () => {}
}

TaskList.propTypes = {
    todos: PropTypes.array.isRequired
}

export default TaskList;