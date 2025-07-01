
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import GeneratorPage from './pages/GeneratorPage'
import AccountPage from './pages/AccountPage'
import Navbar from './components/Navbar'


const App = () =>{
  

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <div className='mx-auto p-4'>

      <Routes>
        <Route path="/generate" element={<GeneratorPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage/>} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      </div>
      </BrowserRouter>
      <footer className="text-center p-4 bg-gray-200">
        <p>&copy; {new Date().getFullYear()} Better Letter</p>
      </footer>
    </>
  )
}

export default App
