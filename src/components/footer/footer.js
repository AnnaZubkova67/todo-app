import React, {Component} from "react";

import TasksFilter from "../tasks-filter";
import './footer.css'
import PropTypes from 'prop-types';

export default class Footer extends Component {

    static defaultProps = {
        onFilter: () => {},
        onClear: () => {}

    }
    static propTypes = {
        countActive: PropTypes.number.isRequired,
        onFilter: PropTypes.func,
        onClear: PropTypes.func
    }

    render() {
        const {countActive, onFilter, onClear} = this.props

        return (
            <footer className="footer">
                <span className="todo-count">{countActive} items left</span>
                <TasksFilter onFilter={onFilter}/>
                <button className="clear-completed"
                        onClick={onClear}>Clear completed
                </button>
            </footer>
        )
    }
}

