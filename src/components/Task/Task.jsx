import './task.scss'
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";

function Task(props) {
    return (
        <li className="task" key={props.task.id}><span style={{ background: props.task.isImportant ? 'red' : "", textDecoration: props.task.isDone ? "line-through" : "" }}>{props.task.name}</span>
            <div className="task-buttons">
                <button className="task-buttons_btn" style={{ background: props.task.isImportant ? 'green' : "" }} onClick={() => props.importantHandler(props.task.id)}><FaStar /></button>
                <button className="task-buttons_btn" style={{ background: props.task.isDone ? 'green' : "" }} onClick={() => props.doneHandler(props.task.id)}><FaCheck /></button>
                <button className="task-buttons_btn" onClick={() => { props.removeTask(props.task.id) }}><FaXmark /></button>
            </div>
        </li>
    )
}

export default Task