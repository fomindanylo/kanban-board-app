import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult
} from '@hello-pangea/dnd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { boardsActions } from '../store/slices/boardsSlice'
import type { Column } from '../types'

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
        const { source, destination, type } = result

        if (!destination) return

        if (type === 'COLUMN') {
            return dispatch(
                boardsActions.reorderColumns({
                    boardId,
                    sourceIndex: source.index,
                    destinationIndex: destination.index,
                })
            )
        }

        if (source.droppableId === destination.droppableId) {
            return dispatch(
                boardsActions.reorderTasksInColumn({
                    boardId,
                    columnId: source.droppableId,
                    sourceIndex: source.index,
                    destinationIndex: destination.index,
                })
            )
        }

        dispatch(
            boardsActions.moveTaskToAnotherColumn({
                boardId,
                sourceColumnId: source.droppableId,
                destinationColumnId: destination.droppableId,
                sourceIndex: source.index,
                destinationIndex: destination.index,
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
                <Droppable droppableId="board-columns" direction="horizontal" type="COLUMN">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex gap-4"
                        >
                            {columns.map((column, index) => (
                                <Draggable key={column.id} draggableId={column.id} index={index}>
                                    {(drag) => (
                                        <div
                                            ref={drag.innerRef}
                                            {...drag.draggableProps}
                                            {...drag.dragHandleProps}
                                        >
                                            <ColumnWithTasks boardId={boardId} column={column} />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
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
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`bg-white min-w-[280px] max-w-[280px] flex-shrink-0 rounded-xl border shadow-md p-4 flex flex-col transition-all duration-200
                  ${snapshot.isDraggingOver ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                `}
                >
                    <h2 className="font-semibold text-blue-700 text-lg mb-3">{column.title}</h2>

                    {
                        column.tasks.length > 0 && (
                            <ul className="space-y-2 mb-4 min-h-[24px]">
                                {column.tasks.map((task, index) => (
                                    <Draggable key={task.id} draggableId={task.id} index={index}>
                                        {(drag) => (
                                            <Link to={`task/${task.id}`} className="block">
                                                <li
                                                    ref={drag.innerRef}
                                                    {...drag.draggableProps}
                                                    {...drag.dragHandleProps}
                                                    className="bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-2 rounded-lg text-sm text-blue-900 shadow-sm transition"
                                                >
                                                    {task.title}
                                                </li>
                                            </Link>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )
                    }

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
            )
            }
        </Droppable >
    )
}