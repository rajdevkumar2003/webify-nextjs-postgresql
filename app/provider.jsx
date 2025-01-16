"use client"
import React, { useState } from 'react'
import Header from './_components/Header'
import { MessagesContext } from '@/context/MessagesContext'

const Provider = ({children}) => {
    const [messages, setMessages] = useState({role:'',content:''});
  return (
    <MessagesContext.Provider value={{messages,setMessages}}>
    <div>
      <Header/>
      <div className="min-h-screen w-full">{children}</div>
    </div>
    </MessagesContext.Provider>
  )
}

export default Provider
