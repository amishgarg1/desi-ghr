import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Cart from './components/Cart'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="app-wrapper flex flex-col" style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </main>
      <Footer />
      <Cart />
      <Toaster position="bottom-center" toastOptions={{ style: { background: 'var(--color-secondary)', color: 'white' } }} />
    </div>
  )
}

export default App
