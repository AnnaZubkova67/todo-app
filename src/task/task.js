import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';
import PropTypes from 'prop-types';

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeFromCreation: 'less than a minute',
      valueInput: this.props.label,
    };
  }

  labelChange = (e) => {
    this.setState({
      valueInput: e.target.value,
    });
  };

  submit = (e) => {
    e.preventDefault();
    const { editingTask, id } = this.props;
    const { valueInput } = this.state;
    editingTask(valueInput, id);
  };

  render() {
    const { label, onDeleted, onToggleDone, done, style, timeOfCreation, onToggleEditing, editing } = this.props;
    const { timeFromCreation, valueInput } = this.state;
    setInterval(() => {
      this.setState({
        timeFromCreation: formatDistanceToNow(new Date(timeOfCreation)),
      });
    }, 30000);

    let className = `${style}`;
    let classInput = 'toggle';
    if (done) {
      className += ' completed';
      classInput += ' checked';
    }
    if (editing) {
      className += ' edit';
    }
    const newEditingTask = (
      <form onSubmit={submit}>
        <input className="new-todo" type="text" onChange={this.labelChange} value={valueInput} />
      </form>
    );
    const viewTask = (
      <div className="view">
        <input className={classInput} type="checkbox" onClick={onToggleDone} />
        <label htmlFor="input">
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <span className="description" onClick={onToggleDone} onKeyDown={onToggleDone}>
            {label}
          </span>
          <span className="created">{timeFromCreation}</span>
        </label>
        <button
          type="button"
          aria-label="Save"
          className="icon icon-edit"
          onClick={onToggleEditing}
          onKeyDown={onToggleEditing}
        />
        <button
          type="button"
          aria-label="Save"
          className="icon icon-destroy"
          onClick={onDeleted}
          onKeyDown={onDeleted}
        />
      </div>
    );

    return <li className={className}>{editing ? newEditingTask : viewTask}</li>;
  }
}

Task.defaultProps = {
  label: '',
};

Task.propTypes = {
  label: PropTypes.node,
};
