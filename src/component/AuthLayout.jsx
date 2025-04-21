import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children,authentication=true}) {
    const naviagte= useNavigate()
    const [loader, setLoader]= useState(true)
    const authStatus= useSelector(state=> state.auth.status)

    useEffect(()=>{

        if(authentication && authStatus !== authentication){
            naviagte("/login")
        }
        else if(!authentication && authStatus !== authentication){
            naviagte("/")
        }
        setLoader(false)
    },
    [naviagte,authentication,authStatus])
    
  return  loader ? <h1>Loading...</h1> : <>{children}</>
}


