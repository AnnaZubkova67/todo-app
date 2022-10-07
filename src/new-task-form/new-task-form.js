import React, { useState, useEffect } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

function NewTaskForm({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [timerMin, setTimerMin] = useState('');
  const [timerSec, setTimerSec] = useState('');
  const [valid, setValid] = useState(true);
  const [classAlert] = useState('alert');

  useEffect(() => {
    setTimeout(() => {
      setValid(true);
    }, 3000);
  }, [valid]);

  const validationForm = (num) => {
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
    }
    return false;
  };

  const labelChange = (e) => {
    if (e.target.name === 'new-todo') {
      setLabel(e.target.value);
    } else if (e.target.name === 'min') {
      if (validationForm(e.target.value)) {
        setTimerMin(e.target.value);
      } else {
        setValid(false);
      }
    } else if (e.target.name === 'sec') {
      if (validationForm(e.target.value)) {
        setTimerSec(e.target.value);
      } else {
        setValid(false);
      }
    }
  };

  const submit = (e) => {
    e.preventDefault();
    onItemAdded(label, timerMin, timerSec);
    setLabel('');
    setTimerMin('');
    setTimerSec('');
  };

  const alert = <Alert message="Введите число от 0 до 59" banner showIcon closable className={classAlert} />;
  return (
    <>
      {!valid ? alert : null}
      <form onSubmit={submit} className="new-todo-form">
        <input
          name="new-todo"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={labelChange}
          value={label}
          required
        />
        <input
          name="min"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={labelChange}
          value={timerMin}
          required
        />
        <input
          name="sec"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={labelChange}
          value={timerSec}
          required
        />
        <input type="submit" className="submit" />
      </form>
    </>
  );
}

export default NewTaskForm;

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
};

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
};
