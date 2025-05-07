import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Board } from '../../types'
import { LocalStorageManager } from '../../utils/localStorage'

export const BOARDS_SLICE_NAME = 'boards'

interface BoardsState {
    boards: Board[]
}

const initialState: BoardsState = {
    boards: LocalStorageManager.getBoards()
}

const boardsSlice = createSlice({
    name: BOARDS_SLICE_NAME,
    initialState,
    reducers: {
        addBoard: (state, action: PayloadAction<string>) => {
            const newBoard: Board = {
                id: crypto.randomUUID(),
                title: action.payload,
                columns: []
            }
            state.boards.push(newBoard)
            LocalStorageManager.setBoards(state.boards)
        },
        addColumnToBoard: (
            state,
            action: PayloadAction<{ boardId: string; columnTitle: string }>
        ) => {
            const board = state.boards.find(b => b.id === action.payload.boardId)
            if (board) {
                board.columns.push({
                    id: crypto.randomUUID(),
                    title: action.payload.columnTitle,
                    tasks: []
                })
                LocalStorageManager.setBoards(state.boards)
            }
        },
        addTaskToColumn: (
            state,
            action: PayloadAction<{ boardId: string; columnId: string; taskTitle: string }>
        ) => {
            const board = state.boards.find(b => b.id === action.payload.boardId)
            const column = board?.columns.find(c => c.id === action.payload.columnId)

            if (column) {
                column.tasks.push({
                    id: crypto.randomUUID(),
                    title: action.payload.taskTitle,
                    description: ''
                })
                LocalStorageManager.setBoards(state.boards)
            }
        },
        reorderTasksInColumn: (
            state,
            action: PayloadAction<{
                boardId: string
                columnId: string
                sourceIndex: number
                destinationIndex: number
            }>
        ) => {
            const { boardId, columnId, sourceIndex, destinationIndex } = action.payload
            const board = state.boards.find(b => b.id === boardId)
            const column = board?.columns.find(c => c.id === columnId)
            if (!column) return

            const [movedTask] = column.tasks.splice(sourceIndex, 1)
            column.tasks.splice(destinationIndex, 0, movedTask)

            LocalStorageManager.setBoards(state.boards)
        },
        moveTaskToAnotherColumn: (
            state,
            action: PayloadAction<{
                boardId: string
                sourceColumnId: string
                destinationColumnId: string
                sourceIndex: number
                destinationIndex: number
            }>
        ) => {
            const {
                boardId,
                sourceColumnId,
                destinationColumnId,
                sourceIndex,
                destinationIndex
            } = action.payload

            const board = state.boards.find((b) => b.id === boardId)
            if (!board) return

            const sourceColumn = board.columns.find((c) => c.id === sourceColumnId)
            const destinationColumn = board.columns.find((c) => c.id === destinationColumnId)

            if (!sourceColumn || !destinationColumn) return

            const [movedTask] = sourceColumn.tasks.splice(sourceIndex, 1)
            if (movedTask) {
                destinationColumn.tasks.splice(destinationIndex, 0, movedTask)
                LocalStorageManager.setBoards(state.boards)
            }
        }
    }
})

export const { reducer: boardsReducer, actions: boardsActions } = boardsSlice