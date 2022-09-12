import React from 'react';
import './task-list.css';
import PropTypes from 'prop-types';

import Task from '../task';

function TaskList({ todos, onDeleted, onToggleDone, onToggleEditing, editingTask }) {
  const elements = todos.map((item) => {
    const { id, style, timeOfCreation, editing, label, done } = item;
    return (
      <Task
        key={id}
        style={style}
        label={label}
        editing={editing}
        id={id}
        done={done}
        timeOfCreation={timeOfCreation}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        onToggleEditing={() => onToggleEditing(id)}
        editingTask={editingTask}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

TaskList.defaultProps = {
  onDeleted: () => {},
  onToggleDone: () => {},
  onToggleEditing: () => {},
};

TaskList.propTypes = {
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onToggleEditing: PropTypes.func,
};

export default TaskList;
