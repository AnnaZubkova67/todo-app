import React, {Component} from "react";

import './button-filter.css'
import PropTypes from "prop-types";

export default class ButtonFilter extends Component {
    static defaultProps = {
        activeButton: () => {},
        name: '',
    }
    static propTypes = {
        activeButton: PropTypes.func,
        name: PropTypes.node,
        id: PropTypes.node.isRequired,
        active: PropTypes.bool.isRequired
    }

    render() {

        const {name, id, active, onFilter, activeButton} = this.props
        let classButton = ''

        if (active) {
            classButton += ' selected'
        }

        return (
            <li onClick={() => onFilter(id)}>
                <button className={classButton}
                        onClick={() => activeButton(id)}>{name}</button>
            </li>

        )
    }
}