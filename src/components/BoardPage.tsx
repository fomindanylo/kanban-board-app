import { Helmet } from 'react-helmet-async'
import { useSelector } from 'react-redux'
import { Outlet,useNavigate, useParams } from 'react-router-dom'

import { RootState } from '../store/store'
import BoardColumns from './BoardColumns'

const BoardPage = () => {
    const navigate = useNavigate()
    const { boardId } = useParams<{ boardId: string }>()
    const board = useSelector((state: RootState) =>
        state.boards.boards.find(b => b.id === boardId)
    )

    if (!board) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Board Not Found</h2>
                <p className="text-gray-600 mb-6">
                    We couldn’t find a board with ID <code className="bg-gray-100 px-2 py-1 rounded text-sm">{boardId}</code>.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                >
                    ← Back to Boards
                </button>
            </div>
        )
    }

    const background = board.color || 'bg-gray-100'

    return (
        <div className={`min-h-screen ${background} p-6`}>
            <Helmet>
                <title>{board.title} | Kanban</title>
            </Helmet>

            <button
                onClick={() => navigate('/')}
                className="mb-4 text-sm text-blue-600 hover:underline inline-flex items-center"
            >
                ← Back to Boards
            </button>

            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{board.title}</h1>
                <BoardColumns boardId={board.id} columns={board.columns} />
            </div>

            <Outlet />
        </div>
    )
}

export default BoardPage