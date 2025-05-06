import { Routes, Route } from 'react-router-dom'

import BoardsListPage from './components/BoardsListPage'
import BoardPage from './components/BoardPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardsListPage />} />
      <Route path="/boards/:boardId" element={<BoardPage />} />
    </Routes>
  )
}

export default App