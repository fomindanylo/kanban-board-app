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
            <div className="p-4 max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Kanban Boards</h1>

                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        className="border rounded p-2 flex-grow"
                        placeholder="Board name..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        onClick={handleAddBoard}
                    >
                        Add
                    </button>
                </div>

                <ul className="space-y-2">
                    {boards.map((board) => (
                        <Link key={board.id} to={`/boards/${board.id}`} className="block hover:underline">
                            {board.title}
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default BoardsListPage