import React, {Component} from "react";
import "./task.css";

export default class Task extends Component {

    state = {
        done: false
    }

    onLabelClick = () => {
        this.setState(({done}) => {
            return {
                done: !done
            }
        })
    }
    render() {

        const {label, onDeleted} = this.props;
        const {done} = this.state;

        let className = '';
        if(done){
            className +=' completed';
        }

        return (
            <li className={className}>
                <div className='view'>
                    <input className="toggle" type="checkbox"/>
                    <label>
                    <span className='description'
                          onClick={this.onLabelClick}>
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
