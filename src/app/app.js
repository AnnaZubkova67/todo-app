import React, { useState } from 'react';

import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';
import './app.css';

function App() {
  // eslint-disable-next-line class-methods-use-this
  const createTodoItem = (label, timerMin, timerSec) => ({
    label,
    timerMin,
    timerSec,
    id: String(Math.random()),
    done: false,
    style: '',
    timeOfCreation: new Date(),
    editing: false,
  });

  const [todoData, setTodoData] = useState([
    createTodoItem('Completed task', 12, 15),
    createTodoItem('Editing task', 12, 15),
    createTodoItem('Active task', 12, 15),
  ]);

  const onToggle = (nameStatus, id) => {
    setTodoData(() => {
      const newArrTask = [...todoData].map((todo) => {
        if (todo.id === id) {
          return { ...todo, [nameStatus]: !todo[nameStatus] };
        }
        return { ...todo };
      });
      return newArrTask;
    });
  };

  const clearCompleted = () => {
    setTodoData(() => [...todoData].filter((todo) => !todo.done));
  };

  const filterTask = (button) => {
    setTodoData(() =>
      [...todoData].map((todo) => {
        todo.style = '';
        if (button === 'completed' && !todo.done) {
          todo.style = 'hidden';
        } else if (button === 'active' && todo.done) {
          todo.style = 'hidden';
        }
        return todo;
      })
    );
  };

  const editingTask = (text, id) => {
    setTodoData(() =>
      [...todoData].map((todo) => {
        if (todo.id === id) {
          return { ...todo, label: text, editing: !todo.editing };
        }
        return { ...todo };
      })
    );
  };

  const toggleDone = (id) => {
    onToggle('done', id);
  };

  const toggleEditing = (id) => {
    onToggle('editing', id);
  };

  const deleteItem = (id) => {
    setTodoData(() => {
      const idx = todoData.findIndex((el) => el.id === id);
      return [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    });
  };

  const addItem = (text, timerMin, timerSec) => {
    const newItem = createTodoItem(text, timerMin, timerSec);
    setTodoData(() => [...todoData, newItem]);
  };

  const countActive = todoData.filter((todo) => !todo.done).length;
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={todoData}
          onDeleted={deleteItem}
          onToggleDone={toggleDone}
          onToggleEditing={toggleEditing}
          editingTask={editingTask}
        />
        <Footer onFilter={filterTask} onClear={clearCompleted} countActive={countActive} />
      </section>
    </section>
  );
}

export default App;
