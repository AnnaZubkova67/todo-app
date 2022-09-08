import React, {Component} from "react";

import NewTaskForm from "../new-task-form";
import Footer from "../footer";
import TaskList from "../task-list";
import './app.css'

export default class App extends Component {

    state = {
        todoData: [
            this.createTodoItem('Completed task'),
            this.createTodoItem('Editing task'),
            this.createTodoItem('Active task')
        ]
    }


    onFilter = (button) => {
        this.setState(({todoData}) => {
            let newObj = JSON.parse(JSON.stringify(todoData));
            let newTask = newObj.map((todo) => {
                todo.style = '';
                if (button === 'completed' && !todo.done) {
                    todo.style = 'hidden'
                } else if (button === 'active' && todo.done) {
                    todo.style = 'hidden'
                }
                return todo;
            })
            return {
                todoData: newTask
            }
        })
    }

    clearCompleted = () => {
        this.setState(({todoData}) => {
            let newObj = JSON.parse(JSON.stringify(todoData));
            let newTask = newObj.filter((todo) => {
                if (!todo.done) {
                    return todo;
                }
            })
            return {
                todoData: newTask
            }
        })
    }


    createTodoItem(label) {
        return {
            label,
            id: Math.random(),
            done: false,
            checked: false,
            style: '',
            timeOfCreation: new Date(),
            editing: false
        }
    }

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            let newArr = JSON.parse(JSON.stringify(todoData));
            newArr = newArr.map((todo) => {
                if (todo.id === id) {
                    return {...todo, done: !todo.done, checked: !todo.checked}
                } else {
                    return {...todo}
                }
            })
            return {
                todoData: newArr
            }
        })
    }

    onToggleEditing = (id) => {
        this.setState(({todoData}) => {
            let newArr = JSON.parse(JSON.stringify(todoData));
            newArr = newArr.map((todo) => {
                if (todo.id === id) {
                    return {...todo, editing: !todo.editing, checked: !todo.checked}
                } else {
                    return {...todo}
                }
            })
            return {
                todoData: newArr
            }
        })
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newArray = [...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)];
            return {
                todoData: newArray
            }
        })
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text)
        this.setState(({todoData}) => {
            const newArr = [
                ...todoData,
                newItem
            ]
            return {
                todoData: newArr
            }
        })
    }


    render() {

        const countActive = this.state.todoData.filter((todo) => !todo.done).length;
        return (
            <section className={'todoapp'}>
                <header className={'header'}>
                    <h1>todos</h1>
                    <NewTaskForm onItemAdded={this.addItem}/>
                </header>
                <section className={'main'}>
                    <TaskList todos={this.state.todoData}
                              onDeleted={this.deleteItem}
                              onToggleDone={this.onToggleDone}
                              onToggleEditing={this.onToggleEditing}/>
                    <Footer onFilter={this.onFilter}
                            onClear={this.clearCompleted}
                    countActive={countActive}/>
                </section>
            </section>
        )
    }
}
