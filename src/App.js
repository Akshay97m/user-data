import React from 'react'
import Form from './components/Form'
import Info from './components/Info'
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/info" element={<Info />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App