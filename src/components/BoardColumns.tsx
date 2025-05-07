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

    const [newColumnTitle, setNewColumnTitle] = useState('')
    const dispatch = useDispatch()

    const handleAddColumn = () => {
        if (!newColumnTitle.trim()) return
        dispatch(
            boardsActions.addColumnToBoard({
                boardId,
                columnTitle: newColumnTitle,
            })
        )
        setNewColumnTitle('')
    }

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
        <>
            <div className="mb-4 max-w-sm">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="New column title"
                        value={newColumnTitle}
                        onChange={(e) => setNewColumnTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleAddColumn()
                            }
                        }}
                        className="flex-grow px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                        onClick={handleAddColumn}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                    >
                        + Add Column
                    </button>
                </div>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>

                <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollSnapType: 'x mandatory' }}>
                    {columns.map((column) => (
                        <ColumnWithTasks key={column.id} column={column} boardId={boardId} />
                    ))}
                </div>
            </DragDropContext>
        </>
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
                    className="bg-white min-w-[280px] max-w-[280px] flex-shrink-0 rounded-2xl border border-gray-200 shadow-sm p-4"
                >
                    <h2 className="font-semibold text-lg text-gray-800 mb-3">{column.title}</h2>

                    <ul className="space-y-1 mb-2">
                        {column.tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(drag) => (
                                    <li
                                        ref={drag.innerRef}
                                        {...drag.draggableProps}
                                        {...drag.dragHandleProps}
                                        className="bg-gray-50 hover:bg-gray-100 transition px-3 py-2 rounded-lg border text-sm text-gray-700 shadow-sm"
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
                        className="w-full text-sm border border-gray-300 rounded-lg px-2 py-1 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Add task..."
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                e.preventDefault()
                                handleAddTask()
                            }
                        }}
                    />
                    <button
                        onClick={handleAddTask}
                        className="w-full text-sm bg-blue-500 text-white rounded-lg px-2 py-1 mt-2 hover:bg-blue-600 transition"
                    >
                        Add Task
                    </button>
                </div>
            )}
        </Droppable>
    )
}