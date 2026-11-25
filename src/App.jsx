
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// 페이지 불러오기
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import JournalCustomizer from './pages/JournalCustomizer'
import Dashboard from './pages/Dashboard'
import WriteDream from './pages/WriteDream'
import InterpretDream from './pages/InterpretDream'
import MyRecords from './pages/MyRecords'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/customize" element={<JournalCustomizer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/write" element={<WriteDream />} />
        <Route path="/interpret" element={<InterpretDream />} />
        <Route path="/records" element={<MyRecords />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
