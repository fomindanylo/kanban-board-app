import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { RootState } from '../../store/store'
import { boardsActions } from '../../store/slices/boardsSlice'

const TaskModal = () => {
    const { boardId, taskId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const board = useSelector((state: RootState) =>
        state.boards.boards.find((b) => b.id === boardId)
    )

    const column = board?.columns.find((col) =>
        col.tasks.some((t) => t.id === taskId)
    )

    const task = column?.tasks.find((t) => t.id === taskId)

    const [title, setTitle] = useState(task?.title || '')

    useEffect(() => {
        if (task) setTitle(task.title)
    }, [task])

    if (!board || !column || !task) {
        navigate(`/boards/${boardId}`, { replace: true })
        return null
    }

    const handleClose = () => navigate(`/boards/${boardId}`)

    const handleSave = () => {
        if (!title.trim()) return
        dispatch(
            boardsActions.updateTask({
                boardId: board.id,
                columnId: column.id,
                taskId: task.id,
                update: { title: title.trim() }
            })
        )
        handleClose()
    }

    const handleDelete = () => {
        dispatch(
            boardsActions.deleteTask({
                boardId: board.id,
                columnId: column.id,
                taskId: task.id
            })
        )
        handleClose()
    }

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
                        onClick={handleDelete}
                        className="text-sm text-red-500 hover:text-red-600 hover:underline transition"
                    >
                        Delete
                    </button>
                    <div className="flex gap-2">
                        <button
                            onClick={handleClose}
                            className="text-sm px-4 py-2 border rounded hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
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