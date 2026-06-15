import { Button } from './components/ui/button'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/ui/shared/navbar'
import Home from './pages/home'
import Auth from './pages/auth'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  )
}

export default App
