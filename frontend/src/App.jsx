import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {Dashboard} from "./pages/Dashboard"
import {SendMoney} from "./pages/SendMoney"
import {Signin} from "./pages/Signin"
import {Signup} from "./pages/Signup"
import { Payment } from './pages/Payment'
import { Animation } from './pages/Animation'

function App() {


  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element = {<Dashboard/>}/>
          <Route path="/send" element = {<SendMoney/>}/>
          <Route path="/signin" element = {<Signin/>}/>
          <Route path="/signup" element = {<Signup/>}/>
          <Route path="/payment" element = {<Payment/>}/>
          <Route path="/success" element = {<Animation/>}/>

        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
