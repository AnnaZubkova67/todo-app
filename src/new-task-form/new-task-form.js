import React, { Component } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
      timerMin: '',
      timerSec: '',
    };
  }

  labelChange = (e) => {
    if (e.target.name === 'new-todo') {
      this.setState({
        label: e.target.value,
      });
    } else if (e.target.name === 'min') {
      this.setState({
        timerMin: e.target.value,
      });
    } else if (e.target.name === 'sec') {
      this.setState({
        timerSec: e.target.value,
      });
    }
  };

  submit = (e) => {
    const { onItemAdded } = this.props;
    const { label, timerMin, timerSec } = this.state;
    e.preventDefault();
    onItemAdded(label, timerMin, timerSec);
    this.setState({
      label: '',
      timerMin: '',
      timerSec: '',
    });
  };

  render() {
    const { label, timerMin, timerSec } = this.state;
    return (
      <form onSubmit={this.submit} className="new-todo-form">
        <input
          name="new-todo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.labelChange}
          value={label}
          required
        />
        <input
          type="number"
          max="59"
          name="min"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.labelChange}
          value={timerMin}
          required
        />
        <input
          type="number"
          max="59"
          name="sec"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.labelChange}
          value={timerSec}
          required
        />
        <input type="submit" className="submit" />
      </form>
    );
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};
