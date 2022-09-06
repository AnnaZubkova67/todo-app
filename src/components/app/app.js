import React, { Component } from "react";

import NewTaskForm from "../new-task-form";
import Footer from "../footer";
import TaskList from "../task-list";
import './app.css'

export default class App extends Component {
    state = {
        todoData: [
            { label: 'Completed task', style: '', id: 1 },
            { label: 'Editing task', style: '', id: 2 },
            { label: 'Active task', style: '', id: 3 }
        ]
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
    render() {
        return (
            <section className={'todoapp'}>
                <header className={'header'}>
                    <h1>
                        todos
                    </h1>
                    <NewTaskForm />
                </header>
                <section className={'main'}>
                    <TaskList todos={this.state.todoData}
                    onDeleted={ this.deleteItem }
                    />
                    <Footer />
                </section>
            </section>
        )
    }


}
