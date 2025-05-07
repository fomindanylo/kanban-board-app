import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'


import { useState } from 'react'
import { RootState } from '../store/store'
import { boardsActions } from '../store/slices/boardsSlice'

const BoardsListPage = () => {
    const boards = useSelector((state: RootState) => state.boards.boards)
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')

    const handleAddBoard = () => {
        if (!title.trim()) return
        dispatch(boardsActions.addBoard(title))
        setTitle('')
    }

    return (
        <>
            <Helmet>
                <title>Kanban Boards</title>
                <meta name="description" content="Manage your boards in a clean Kanban interface." />
            </Helmet>
            <div className="max-w-7xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6">Your Boards</h1>

                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        className="border rounded p-2 flex-grow"
                        placeholder="Board name..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleAddBoard()
                            }
                        }}
                    />
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handleAddBoard}
                    >
                        Add
                    </button>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {boards.map((board) => (
                        <li key={board.id}>
                            <Link
                                to={`/boards/${board.id}`}
                                className="block p-4 rounded-xl bg-white hover:bg-blue-50 shadow-sm border border-gray-200 transition"
                            >
                                <h2 className="font-medium text-lg text-gray-800">{board.title}</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {board.columns.length} column{board.columns.length !== 1 && 's'}
                                </p>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default BoardsListPage