import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store/store'
import { boardsActions } from '../store/slices/boardsSlice'
import TaskModal from './TaskModal'

const TaskModalWrapper = () => {
    const { boardId = '', taskId = '' } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const board = useSelector((state: RootState) =>
        state.boards.boards.find((b) => b.id === boardId)
    )

    const column = board?.columns.find((col) =>
        col.tasks.some((t) => t.id === taskId)
    )
    const task = column?.tasks.find((t) => t.id === taskId)

    if (!task || !column || !board) return null

    return (
        <TaskModal
            task={task}
            onClose={() => navigate(`/boards/${boardId}`)}
            onSave={(update) => {
                dispatch(
                    boardsActions.updateTask({
                        boardId,
                        columnId: column.id,
                        taskId: task.id,
                        update
                    })
                )
                navigate(`/boards/${boardId}`)
            }}
            onDelete={() => {
                dispatch(
                    boardsActions.deleteTask({
                        boardId,
                        columnId: column.id,
                        taskId: task.id
                    })
                )
                navigate(`/boards/${boardId}`)
            }}
        />
    )
}

export default TaskModalWrapper