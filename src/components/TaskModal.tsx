import { useState } from 'react'
import { Task } from '../types'

interface TaskModalProps {
    task: Task
    onClose: () => void
    onSave: (updatedTask: Partial<Task>) => void
    onDelete: () => void
}

const TaskModal = ({ task, onClose, onSave, onDelete }: TaskModalProps) => {
    const [title, setTitle] = useState(task.title)

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Edit Task</h2>

                <input
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="flex justify-between items-center">
                    <button
                        onClick={onDelete}
                        className="text-sm text-red-500 hover:text-red-600 hover:underline transition"
                    >
                        Delete
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="text-sm px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                if (title.trim()) onSave({ title: title.trim() })
                            }}
                            className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskModal