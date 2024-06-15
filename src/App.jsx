import Header from './components/Header'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Hero from './Hero';



const App = () => {


  return (
    <>
    <BrowserRouter>
    <Header />
      <Hero />
      </BrowserRouter>
      
    </>
  )
}

export default App
