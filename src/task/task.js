import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static padTime = (time) => time.toString().padStart(2, '0');

  constructor(props) {
    super(props);
    this.state = {
      timeFromCreation: 'less than a minute',
      valueInput: this.props.label,
      timerMin: this.props.timerMin,
      timerSec: this.props.timerSec,
      active: false,
    };
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  labelChange = (e) => {
    this.setState({
      valueInput: e.target.value,
    });
  };

  timer = () => {
    if (Number(this.state.timerMin) === 0 && Number(this.state.timerSec) === 0) {
      clearInterval(this.timerID);
      this.setState({ active: false });
    } else if (Number(this.state.timerSec) === 0) {
      this.setState((prevState) => ({ timerMin: prevState.timerMin - 1, timerSec: 59 }));
    } else {
      this.setState((prevState) => ({ timerSec: prevState.timerSec - 1 }));
    }
  };

  submit = (e) => {
    e.preventDefault();
    const { editingTask, id } = this.props;
    const { valueInput } = this.state;
    editingTask(valueInput, id);
  };

  playTimer = () => {
    this.setState({
      active: true,
    });
    this.timerID = setInterval(() => this.timer(), 1000);
  };

  pauseTimer = () => {
    clearInterval(this.timerID);
    this.setState({
      active: false,
    });
  };

  render() {
    const { label, onDeleted, onToggleDone, done, style, timeOfCreation, onToggleEditing, editing } = this.props;
    const { timeFromCreation, valueInput, timerMin, timerSec, active } = this.state;
    const minute = Task.padTime(timerMin);
    const second = Task.padTime(timerSec);
    setInterval(() => {
      this.setState({
        timeFromCreation: formatDistanceToNow(new Date(timeOfCreation)),
      });
    }, 30000);

    let className = `${style}`;
    let classInput = 'toggle';
    let classTimer = 'timer';
    if (done) {
      className += ' completed';
      classInput += ' checked';
    }
    if (editing) {
      className += ' editing';
    }
    if (!active && Number(timerMin) === 0 && Number(timerSec) === 0) {
      classTimer += ' end';
    }

    const newEditingTask = (
      <form onSubmit={this.submit}>
        <input className="edit" type="text" onChange={this.labelChange} value={valueInput} />
      </form>
    );
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    const buttonPlay = <button type="button" className="icon-play" onClick={this.playTimer} />;
    // eslint-disable-next-line jsx-a11y/control-has-associated-label
    const buttonPause = <button type="button" className="icon-pause" onClick={this.pauseTimer} />;
    const viewTask = (
      <div className="view">
        <input className={classInput} type="checkbox" onClick={onToggleDone} />
        <label htmlFor="input">
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
          <span className="title" onClick={onToggleDone} onKeyDown={onToggleDone}>
            {label}
          </span>
          <span className="description">
            {active ? buttonPause : buttonPlay}
            <div className={classTimer}>{`${minute}:${second}`}</div>
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
  timerMin: '00',
  timerSec: '00',
};

Task.propTypes = {
  label: PropTypes.node,
  timerMin: PropTypes.node,
  timerSec: PropTypes.node,
};
