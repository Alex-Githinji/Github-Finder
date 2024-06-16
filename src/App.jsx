import Header from './components/Header'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Repo from './userDetails/Repo';



const App = () => {


  return (
    <>
    <BrowserRouter>
    <Header />
      {/* <Repo /> */}
      </BrowserRouter>
      
    </>
  )
}

export default App
