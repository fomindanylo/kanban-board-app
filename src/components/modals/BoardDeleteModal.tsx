import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store/store'
import { boardsActions } from '../../store/slices/boardsSlice'
import ConfirmModal from './ConfirmModal'

const BoardDeleteModal = () => {
    const { boardId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const board = useSelector((state: RootState) =>
        state.boards.boards.find((b) => b.id === boardId)
    )

    if (!board) {
        navigate('/', { replace: true })
        return null
    }

    return (
        <ConfirmModal
            title="Delete Board"
            message={`Are you sure you want to delete "${board.title}"?`}
            onCancel={() => navigate('/')}
            onConfirm={() => {
                dispatch(boardsActions.removeBoard({ boardId: board.id }))
                navigate('/')
            }}
        />
    )
}

export default BoardDeleteModal