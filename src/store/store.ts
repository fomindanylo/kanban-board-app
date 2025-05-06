import { configureStore } from '@reduxjs/toolkit'
export const store = configureStore({
  reducer: {
    // example: counter: counterReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch