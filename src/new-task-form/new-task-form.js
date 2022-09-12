import React, { Component } from 'react';
import './new-task-form.css';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };
  }

  labelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  submit = (e) => {
    const { onItemAdded } = this.props;
    const { label } = this.state;
    e.preventDefault();
    onItemAdded(label);
    this.setState({
      label: '',
    });
  };

  render() {
    const { label } = this.state;
    return (
      <form onSubmit={this.submit}>
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.labelChange} value={label} />
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
