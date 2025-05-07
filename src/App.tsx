import { Routes, Route } from 'react-router-dom'

import BoardsListPage from './components/BoardsListPage'
import TaskModal from './components/modals/TaskModal'
import BoardPage from './components/BoardPage'
import BoardDeleteModal from './components/modals/BoardDeleteModal'
import BoardEditModal from './components/modals/BoardEditModal'

function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardsListPage />}>
        <Route path="edit/:boardId" element={<BoardEditModal />} />
        <Route path="delete/:boardId" element={<BoardDeleteModal />} />
      </Route>
      <Route path="/boards/:boardId" element={<BoardPage />}>
        <Route path="task/:taskId" element={<TaskModal />} />
      </Route>
    </Routes>
  )
}

export default App