import React, { Component } from 'react';

import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';
import './app.css';

export default class App extends Component {
  static createTodoItem(label) {
    return {
      label,
      id: String(Math.random()),
      done: false,
      style: '',
      timeOfCreation: new Date(),
      editing: false,
    };
  }

  constructor() {
    super();
    this.state = {
      todoData: [
        App.createTodoItem('Completed task'),
        App.createTodoItem('Editing task'),
        App.createTodoItem('Active task'),
      ],
    };
  }

  onToggle = (nameStatus, id) => {
    this.setState(({ todoData }) => {
      const newArrTask = [...todoData].map((todo) => {
        if (todo.id === id) {
          return { ...todo, [nameStatus]: !todo[nameStatus] };
        }
        return { ...todo };
      });
      return {
        todoData: newArrTask,
      };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArrTask = [...todoData].filter((todo) => !todo.done);
      return {
        todoData: newArrTask,
      };
    });
  };

  filterTask = (button) => {
    this.setState(({ todoData }) => {
      const newArrTask = [...todoData].map((todo) => {
        todo.style = '';
        if (button === 'completed' && !todo.done) {
          todo.style = 'hidden';
        } else if (button === 'active' && todo.done) {
          todo.style = 'hidden';
        }
        return todo;
      });
      return {
        todoData: newArrTask,
      };
    });
  };

  editingTask = (text, id) => {
    this.setState(({ todoData }) => {
      const newArrTask = [...todoData].map((todo) => {
        if (todo.id === id) {
          return { ...todo, label: text, editing: !todo.editing };
        }
        return { ...todo };
      });
      return {
        todoData: newArrTask,
      };
    });
  };

  toggleDone = (id) => {
    this.onToggle('done', id);
  };

  toggleEditing = (id) => {
    this.onToggle('editing', id);
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = App.createTodoItem(text);
    this.setState(({ todoData }) => {
      const newArrTask = [...todoData, newItem];
      return {
        todoData: newArrTask,
      };
    });
  };

  render() {
    const { todoData } = this.state;
    const countActive = todoData.filter((todo) => !todo.done).length;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={todoData}
            onDeleted={this.deleteItem}
            onToggleDone={this.toggleDone}
            onToggleEditing={this.toggleEditing}
            editingTask={this.editingTask}
          />
          <Footer onFilter={this.filterTask} onClear={this.clearCompleted} countActive={countActive} />
        </section>
      </section>
    );
  }
}
