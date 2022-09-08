import React, {Component} from "react";
import "./task.css";

export default class Task extends Component {

    state = {
        done: false,
        checked: false
    }

    // onLabelClick = (e) => {
    //     this.setState(({done, checked}) => {
    //         e.target.closest('.view').firstChild.checked = !checked;
    //         console.log(this.props)
    //         return {
    //             done: !done,
    //             checked: !checked
    //         }
    //     })
    //
    // }
    render() {
        // console.log(this.props)
        const {label, onDeleted, onToggleDone, done, style} = this.props;

        let className = `${style}`;
        if(done){
            className +=' completed';
        }

        return (
            <li
                className={className}
                >
                <div className='view'
                     onClick={onToggleDone}>
                    {/*<input className="toggle" type="checkbox" defaultChecked={this.state.checked}/>*/}
                    <input className="toggle" type="checkbox" />
                    <label >
                    <span className='description'
                          >
                        {label}
                    </span>
                        <span className="created">created 17 seconds ago</span>
                    </label>
                    <button className="icon icon-edit"/>
                    <button className="icon icon-destroy"
                    onClick={onDeleted}
                    />
                </div>
            </li>

        );
    }
}
