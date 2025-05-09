import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useDispatch,useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'

import { boardsActions } from '../store/slices/boardsSlice'
import { RootState } from '../store/store'

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
                        <li key={board.id} className="relative group">
                            <Link
                                to={`/boards/${board.id}`}
                                className={`block p-4 rounded-xl shadow-sm border border-gray-200 transition ${board.color || 'bg-white'
                                    } hover:brightness-95`}
                            >
                                <h2 className="font-medium text-lg text-gray-800">{board.title}</h2>
                                <p className="text-sm text-gray-500 mt-1">
                                    {board.columns.length} column{board.columns.length !== 1 && 's'}
                                </p>
                            </Link>

                            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                                <Link
                                    to={`/edit/${board.id}`}
                                    className="text-sm px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                                >
                                    ✎
                                </Link>
                                <Link
                                    to={`/delete/${board.id}`}
                                    className="text-sm px-2 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                                >
                                    ✕
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <Outlet />
        </>
    )
}

export default BoardsListPage