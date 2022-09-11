import React, {Component} from "react";
import ButtonFilter from "../button-filter";

import './tasks-filter.css';


export default class TasksFilter extends Component {

    state = {
        buttonFilter: [
            {name: 'All', id: 'all', active: true},
            {name: 'Active', id: 'active', active: false},
            {name: 'Completed', id: 'completed', active: false},
        ]
    }
    activeButton = (id) => {
        this.setState(({buttonFilter}) => {
            let newArr = JSON.parse(JSON.stringify(buttonFilter));
            newArr = newArr.map((button) => {
                if (button.id === id) {
                    return {...button, active: true}
                } else {
                    return {...button, active: false}
                }
            })
            return {
                buttonFilter: newArr
            }
        })
    }


    render() {

        const buttonElement = this.state.buttonFilter.map((button) => {
            const {name, id, active} = button;
            return (
                <ButtonFilter key={id}
                              id={id}
                              name={name}
                              active={active}
                              onFilter={this.props.onFilter}
                              activeButton={this.activeButton}/>
            )
        })

        return (
            <ul className="filters">
                {buttonElement}
            </ul>
        )
    }
}
