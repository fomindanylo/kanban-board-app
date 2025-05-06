import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { RootState } from '../store/store'
import { boardsActions } from '../store/slices/boardsSlice'
import { Helmet } from 'react-helmet-async'

const BoardPage = () => {
    const { boardId } = useParams<{ boardId: string }>()
    const dispatch = useDispatch()
    const board = useSelector((state: RootState) =>
        state.boards.boards.find(b => b.id === boardId)
    )

    const [columnTitle, setColumnTitle] = useState('')

    const handleAddColumn = () => {
        if (!board || !columnTitle.trim()) return
        dispatch(boardsActions.addColumnToBoard({ boardId: board.id, columnTitle }))
        setColumnTitle('')
    }

    if (!board) {
        return <p className="text-center text-red-500">Board not found</p>
    }

    return (
        <div className="p-4 max-w-5xl mx-auto">
            <Helmet>
                <title>{board.title} | Kanban</title>
            </Helmet>

            <h1 className="text-3xl font-bold mb-6">{board.title}</h1>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    className="border rounded p-2 flex-grow"
                    placeholder="New column title..."
                    value={columnTitle}
                    onChange={(e) => setColumnTitle(e.target.value)}
                />
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={handleAddColumn}
                >
                    Add Column
                </button>
            </div>

            <div className="flex gap-4 overflow-x-auto">
                {board.columns.map((column) => (
                    <div
                        key={column.id}
                        className="bg-white min-w-[200px] border rounded shadow p-3"
                    >
                        <h2 className="font-semibold mb-2">{column.title}</h2>
                        {column.tasks.length === 0 && (
                            <p className="text-gray-400 text-sm">No tasks yet</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BoardPage