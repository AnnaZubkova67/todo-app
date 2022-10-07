import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';
import PropTypes from 'prop-types';

function Task({
  label,
  onDeleted,
  onToggleDone,
  done,
  style,
  timeOfCreation,
  onToggleEditing,
  editing,
  id,
  timerMin,
  timerSec,
  editingTask,
}) {
  const padTime = (time) => time.toString().padStart(2, '0');

  const [timeFromCreation, setTimeFromCreation] = useState('less than a minute');
  const [valueInput, setValueInput] = useState(label);
  const [timeMin, setTimeMin] = useState(timerMin);
  const [timeSec, setTimeSec] = useState(timerSec);
  const [active, setActive] = useState(false);
  const [blurEditing, setBlurEditing] = useState(false);

  const labelChange = (e) => {
    setValueInput(e.target.value);
  };

  useEffect(() => {
    const time = setInterval(() => {
      setTimeFromCreation(formatDistanceToNow(new Date(timeOfCreation)));
    }, 30000);
    return () => clearInterval(time);
  }, [timeOfCreation]);

  useEffect(() => {
    let timerID = null;
    if (active) {
      timerID = setInterval(() => {
        if (Number(timeMin) === 0 && Number(timeSec) === 0) {
          setActive(false);
        } else if (Number(timeSec) === 0) {
          setTimeMin((tm) => tm - 1);
          setTimeSec(59);
        } else {
          setTimeSec((ts) => ts - 1);
        }
      }, 1000);
    }
    return () => clearInterval(timerID);
  }, [active, timeMin, timeSec]);

  const playTimer = () => {
    setActive(true);
  };

  const pauseTimer = () => {
    setActive(false);
  };

  const clickButtonEditing = (e) => {
    onToggleEditing();
    const focusElem = e.target.closest('li').querySelector('.edit');
    setBlurEditing(true);
    setInterval(() => focusElem.focus(), 500);
  };

  const exitEditing = (e) => {
    if (e.keyCode === 27) {
      onToggleEditing();
      setBlurEditing(false);
      setValueInput(label);
    } else if (e.keyCode === 13) {
      editingTask(valueInput, id);
      setBlurEditing(false);
    }
  };

  const blur = () => {
    if (blurEditing) {
      onToggleEditing();
    }
    setBlurEditing(false);
    setValueInput(label);
  };
  const minute = padTime(timeMin);
  const second = padTime(timeSec);

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
  if (!active && Number(timeMin) === 0 && Number(timeSec) === 0) {
    classTimer += ' end';
  }

  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  const buttonPlay = <button type="button" className="icon-play" onClick={playTimer} />;
  // eslint-disable-next-line jsx-a11y/control-has-associated-label
  const buttonPause = <button type="button" className="icon-pause" onClick={pauseTimer} />;
  return (
    <li className={className}>
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
          onClick={clickButtonEditing}
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
      <input
        className="edit"
        type="text"
        value={valueInput}
        onChange={labelChange}
        onKeyDown={exitEditing}
        onBlur={blur}
      />
    </li>
  );
}

export default Task;

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
