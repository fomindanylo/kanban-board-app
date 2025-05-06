import { Routes, Route } from 'react-router-dom'
import BoardList from './components/BoardsList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<BoardList />} />
    </Routes>
  )
}

export default App