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
        }
    }
})

export const { reducer: boardsReducer, actions: boardsActions } = boardsSlice