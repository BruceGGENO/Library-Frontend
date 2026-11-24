import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import LibraryButton from './components/LibraryButton'
import Footer from './components/Footer'
import Header from './components/LibraryHeader'
import LibraryBooks from './components/LibraryBooks'
import LibraryLogin from './components/LibraryLogin'
import Office from './components/Office'
import OfficeList from './components/OfficeList'
import { Route, Routes } from 'react-router'
import Doctor from './components/Doctor'

function App() {

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<LibraryLogin />} />
          <Route path="/office" element={<Office />} />
          <Route path="/books" element={<LibraryBooks />} />
          <Route path="*" element={<LibraryLogin />} />
          <Route path="/doctor" element={<Doctor />} />
        </Routes>
      </div>

    </>
  )
}

export default App
