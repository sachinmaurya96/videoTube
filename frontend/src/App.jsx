import { useState } from 'react'
import './App.css'
import DataCard from './components/DataCard'
import ProfileCard from './components/ProfileCard'
import WeaterCard from './components/WeaterCard'
import Notification from './components/Notification'
import FollowerCard from './components/FollowerCard'
import Layout from './components/Layout'
import Header from './components/Header'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/Loginpage'

function App() {
  const [toggle,setToggle] = useState(false)
  function toggleSidebar(value){
    setToggle(value)
  }
  return (
   <>
   <Header toggle={toggle} setTogle={toggleSidebar}/>
   <Layout toggle={toggle} setTogle={toggleSidebar}/>
   </>
  )
}

export default App
