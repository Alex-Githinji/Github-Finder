import Header from './components/Header'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Hero from './Hero';
import Repo from './userDetails/Repo';



const App = () => {


  return (
    <>
    <BrowserRouter>
    <Header />
      <Hero />
      <Repo />
      </BrowserRouter>
      
    </>
  )
}

export default App
