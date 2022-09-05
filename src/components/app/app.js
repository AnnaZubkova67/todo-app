import React from "react";

import NewTaskForm from "../new-task-form";
import Footer from "../footer";
import TaskList from "../task-list";
import './app.css'

const App = () => {

    const todoData = [
        { label: 'Completed task', style: 'completed', id: 1 },
        { label: 'Editing task', style: 'editing', id: 2 },
        { label: 'Active task', style: '', id: 3 }
    ];


    return (
        <section className={'todoapp'}>
            <header className={'header'}>
            <h1>
                todos
            </h1>
            <NewTaskForm />
        </header>
            <section className={'main'}>
                <TaskList todos={todoData} />
                <Footer />
            </section>
        </section>
    )
}

export default App;