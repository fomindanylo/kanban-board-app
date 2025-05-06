import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult
} from '@hello-pangea/dnd'
import { useDispatch } from 'react-redux'
import { boardsActions } from '../store/slices/boardsSlice'
import type { Column } from '../types'
import { useState } from 'react'

interface BoardColumnsProps {
    boardId: string
    columns: Column[]
}

const BoardColumns = ({ boardId, columns }: BoardColumnsProps) => {
    const dispatch = useDispatch()

    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result
        if (!destination || source.droppableId !== destination.droppableId) return

        dispatch(
            boardsActions.reorderTasksInColumn({
                boardId,
                columnId: source.droppableId,
                sourceIndex: source.index,
                destinationIndex: destination.index
            })
        )
    }

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-4 overflow-x-auto">
                {columns.map((column) => (
                    <ColumnWithTasks key={column.id} column={column} boardId={boardId} />
                ))}
            </div>
        </DragDropContext>
    )
}

export default BoardColumns

// Subcomponent for a single column
const ColumnWithTasks = ({ column, boardId }: { column: Column; boardId: string }) => {
    const dispatch = useDispatch()
    const [taskTitle, setTaskTitle] = useState('')

    const handleAddTask = () => {
        if (!taskTitle.trim()) return
        dispatch(
            boardsActions.addTaskToColumn({
                boardId,
                columnId: column.id,
                taskTitle
            })
        )
        setTaskTitle('')
    }

    return (
        <Droppable droppableId={column.id}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-white min-w-[200px] border rounded shadow p-3"
                >
                    <h2 className="font-semibold mb-2">{column.title}</h2>

                    <ul className="space-y-1 mb-2">
                        {column.tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(drag) => (
                                    <li
                                        ref={drag.innerRef}
                                        {...drag.draggableProps}
                                        {...drag.dragHandleProps}
                                        className="bg-gray-100 px-2 py-1 rounded"
                                    >
                                        {task.title}
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>

                    <input
                        type="text"
                        className="w-full p-1 border rounded text-sm"
                        placeholder="Add task..."
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                    />
                    <button
                        onClick={handleAddTask}
                        className="w-full mt-1 text-sm bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-600"
                    >
                        Add
                    </button>
                </div>
            )}
        </Droppable>
    )
}