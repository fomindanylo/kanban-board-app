import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { boardsActions } from '../../store/slices/boardsSlice'
import { useState, useEffect } from 'react'

const predefinedColors = [
    'bg-white',
    'bg-gray-100',
    'bg-blue-50',
    'bg-green-50',
    'bg-yellow-50',
]

const BoardEditModal = () => {
    const { boardId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const board = useSelector((state: RootState) =>
        state.boards.boards.find((b) => b.id === boardId)
    )

    const [title, setTitle] = useState('')

    useEffect(() => {
        if (board) setTitle(board.title)
    }, [board])

    if (!board) return null

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Edit Board</h2>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                />

                <p className="text-sm text-gray-700 mb-2 font-medium">Choose board color:</p>
                <div className="flex gap-2 mb-4">
                    {predefinedColors.map((color) => (
                        <button
                            key={color}
                            type="button"
                            onClick={() =>
                                dispatch(
                                    boardsActions.updateBoardColor({ boardId: board.id, color })
                                )
                            }
                            className={`
                                w-8 h-8 rounded-full 
                                border 
                                ${color} 
                                ${board.color === color ? 'ring-2 ring-black' : 'border-gray-300'}
                            `}
                            title={color.replace('bg-', '').replace('-', ' ')}
                        />
                    ))}
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 text-sm border border-gray-300 rounded hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            dispatch(
                                boardsActions.updateBoardTitle({
                                    boardId: board.id,
                                    title: title.trim()
                                })
                            )
                            navigate('/')
                        }}
                        className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BoardEditModal