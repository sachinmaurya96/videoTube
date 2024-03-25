import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/Loginpage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import Protected from './components/Protected.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<Protected authentication><App/></Protected>,
  },
  {
    path:"/login",
    element:<Protected authentication={false}><LoginPage/></Protected>,
  },
  {
    path:"/signup",
    element:<Protected authentication={false}><SignupPage/></Protected>,
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
   
)
