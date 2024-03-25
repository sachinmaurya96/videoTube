import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({children,authentication=true}) => {
    const authStatus = false
    const navigate = useNavigate()

    useEffect(()=>{
        if(authentication && authStatus !== authentication){
            navigate("/login")
        }else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
    },[authStatus,authentication,navigate])
  return (
    <>
      {children}
    </>
  )
}

export default Protected