import React, {Component} from "react";

import TasksFilter from "../tasks-filter";
import './footer.css'

export default class Footer extends Component {

    render() {

        return(
            <footer className="footer">
                <span className="todo-count">{this.props.countActive} items left</span>
                <TasksFilter onFilter={this.props.onFilter}/>
                <button className="clear-completed"
                onClick={this.props.onClear}>Clear completed</button>
            </footer>
        )
    }
}

