
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import PromptPage from './pages/PromptPage'
import AccountPage from './pages/AccountPage'
import Navbar from './components/Navbar'


const App = () =>{
  

  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/prompt" element={<PromptPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/contact" element={<h1>Contact</h1>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage/>} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
