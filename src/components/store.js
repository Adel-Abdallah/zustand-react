import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware'

const store = (set) => ({
    tasks: [],
    draggedTask: null,
    addTask: (title, state) =>
        set((store) => ({ tasks: [...store.tasks, { title, state }] }), false, 'Add Task'),
    deleteTask: (title) =>
        set((store) => ({
            tasks: store.tasks.filter((task) => task.title !== title),
        }), false, 'Delete Task'),
    setDraggedTask: (title) => set({ draggedTask: title }, false, 'Set Dragged Task'),
    moveTask: (title, state) =>
        set((store) => ({
            tasks: store.tasks.map((task) => (task.title === title ? { title, state } : task)),
        }),false, 'Move Task'),
});

export const useStore = create(persist(devtools(store), {name:"store"}));