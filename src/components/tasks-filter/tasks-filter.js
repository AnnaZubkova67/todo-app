import React, {Component} from "react";

import './tasks-filter.css';


export default class TasksFilter extends Component {

    render() {

        return (
            <ul className="filters">
                <li>
                    <button onClick={() => this.props.onFilter('all')}>All</button>
                </li>
                <li>
                    <button onClick={() => this.props.onFilter('active')}>Active</button>
                </li>
                <li>
                    <button onClick={() => this.props.onFilter('completed')}>Completed</button>
                </li>
            </ul>
        )
    }
}
