import { Routes, Route } from 'react-router-dom'

import BoardsListPage from './components/BoardsListPage'
import TaskModalWrapper from './components/TaskModalWrapper'
import BoardPage from './components/BoardPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardsListPage />} />
      <Route path="/boards/:boardId" element={<BoardPage />}>
        <Route path="task/:taskId" element={<TaskModalWrapper />} />
      </Route>
    </Routes>
  )
}

export default App