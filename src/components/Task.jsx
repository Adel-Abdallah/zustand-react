import PropTypes from 'prop-types';
import './Task.css'
import classNames from 'classnames';
import { useStore } from './store';
export default function Task({ title }) {
    const task = useStore((store) =>
        store.tasks.find((task) => task.title === title)
    );
    const setDraggedTask = useStore(store => store.setDraggedTask);
    const deleteTask = useStore(store => store.deleteTask);
    const moveTask = useStore(store => store.moveTask);
    const handleStateChange = (e) => {
        const newState = e.target.value;
        moveTask(task.title, newState);
    };

    return (
        <div
            className='task'
            draggable
            onDragStart={() => {
                setDraggedTask(task.title)
            }}
        >

            <div className='Wrapper'>
                <div>{task.title}</div>
                <select className='SelectOptions' value={task.state} onChange={handleStateChange}>
                    <option value="PLANNED">Planned</option>
                    <option value="ONGOING">Ongoing</option>
                    <option value="DONE">Done</option>
                </select>
            </div>
            <div className='Wrapper'>
                <div className='iconWrapper' onClick={() => { deleteTask(task.title) }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="var(--COLOR-GRAY)" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </div>
                <div className={classNames('status', task.state)}>{task.state}</div>
            </div>
        </div>)

}

Task.propTypes = {
    title: PropTypes.string.isRequired,
};
