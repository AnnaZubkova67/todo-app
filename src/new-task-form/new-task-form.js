import React, { Component } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
// import 'antd/dist/antd.css';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
      timerMin: '',
      timerSec: '',
      valid: true,
      classAlert: 'alert',
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.valid !== prevState.valid) {
      setTimeout(() => {
        this.setState({
          valid: true,
        });
      }, 3000);
    }
  }

  // eslint-disable-next-line consistent-return,class-methods-use-this
  validationForm = (num) => {
    const validationNumOne = /[0-5]/g;
    const validationNumTwo = /[0-9]/g;
    const time = num.split('');
    let comparsionNumOne = null;
    let comparsionNumTwo = null;
    if (time.length === 1) {
      comparsionNumOne = time[0].match(validationNumTwo);
      if (comparsionNumOne !== null) {
        return true;
      }
    } else if (time.length === 2) {
      comparsionNumOne = time[0].match(validationNumOne);
      comparsionNumTwo = time[0].match(validationNumTwo);
      if (comparsionNumOne !== null && comparsionNumTwo !== null) {
        return true;
      }
    } else if (time.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  labelChange = (e) => {
    if (e.target.name === 'new-todo') {
      this.setState({
        label: e.target.value,
      });
    } else if (e.target.name === 'min') {
      if (this.validationForm(e.target.value)) {
        this.setState({
          timerMin: e.target.value,
        });
      } else {
        this.setState({
          valid: false,
        });
      }
    } else if (e.target.name === 'sec') {
      if (this.validationForm(e.target.value)) {
        this.setState({
          timerSec: e.target.value,
        });
      } else {
        this.setState({
          valid: false,
        });
      }
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
    const { label, timerMin, timerSec, valid, classAlert } = this.state;
    const alert = <Alert message="Введите число от 0 до 59" banner showIcon closable className={classAlert} />;
    return (
      <>
        {!valid ? alert : null}
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
            name="min"
            className="new-todo-form__timer"
            placeholder="Min"
            onChange={this.labelChange}
            value={timerMin}
            required
          />
          <input
            name="sec"
            className="new-todo-form__timer"
            placeholder="Sec"
            onChange={this.labelChange}
            value={timerSec}
            required
          />
          <input type="submit" className="submit" />
        </form>
      </>
    );
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};
