import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { RootState } from '../store/store'
import { boardsActions } from '../store/slices/boardsSlice'
import { Helmet } from 'react-helmet-async'

import BoardColumns from './BoardColumns'

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
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-pink-50 p-6">
            <Helmet>
                <title>{board.title} | Kanban</title>
            </Helmet>

            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">{board.title}</h1>
                <BoardColumns boardId={board.id} columns={board.columns} />
            </div>
        </div>
    )
}

export default BoardPage