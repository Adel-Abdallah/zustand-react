import { useState } from 'react';
import PropTypes from 'prop-types';
import './Column.css';
import Task from './Task';
import { useStore } from './store';
import { shallow } from 'zustand/shallow'
import classNames from 'classnames';

function Column({ state }) {
    const [text, setText] = useState('')
    const [open, setOpen] = useState(false)
    const [drop, setDrop] = useState(false)


    const tasks = useStore(store =>
        store.tasks.filter((task) => task.state === state), shallow
    );
    const addTask = useStore(store => store.addTask);
    const setDraggedTask = useStore(store => store.setDraggedTask);
    const draggedTask = useStore(store => store.draggedTask);
    const moveTask = useStore(store => store.moveTask);

    return (
        <div
            className={classNames('column', { drop: drop })}
            onDragOver={(e) => {
                setDrop(true)
                e.preventDefault();
            }}
            onDragLeave={(e) => {
                setDrop(false)
                e.preventDefault();
            }}
            onDrop={() => {
                setDrop(false)
                moveTask(draggedTask, state)
                setDraggedTask(null)
            }}
        >
            <div className='titleWrapper'>
                <p>{state}</p>
                <button onClick={() => setOpen(true)}>Add</button>
            </div>
            {tasks.map((task) => <Task title={task.title} key={task.title} />)}
            {open && 
    <div className='Modal'>
        <div className='ModalContent'>
            <button className="closeModal" onClick={() => {
                setText('');
                setOpen(false);
            }}>x</button>
            <div className="inputContainer"> {/* This is the new wrapper */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (text.trim()) {
                        addTask(text, state);
                        setText('');
                        setOpen(false);
                    } else {
                        alert('Please enter a valid task! enter');
                    }
                }}>
                    <input
                        type="text"
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        autoFocus
                    />
                    <button type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
}


        </div>
    )
}

Column.propTypes = {
    state: PropTypes.string.isRequired,
};

export default Column;
