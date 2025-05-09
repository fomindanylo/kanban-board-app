import { Route,Routes } from 'react-router-dom'

import BoardPage from './components/BoardPage'
import BoardsListPage from './components/BoardsListPage'
import BoardDeleteModal from './components/modals/BoardDeleteModal'
import BoardEditModal from './components/modals/BoardEditModal'
import TaskModal from './components/modals/TaskModal'

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