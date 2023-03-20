import './styles/global.css'
import './lib/dayjs'
import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import { useEffect, useState } from 'react'
import { auth } from './services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import jwt from './auth/index.js'
import { Authentication } from './views/Authentication'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

function App() {
  const [isLoggedIn, setStateIsLoggedIn] = useState(false)

  useEffect(() => {
    onAuthStateChanged
    jwt.init()
  }, [])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setStateIsLoggedIn(true)
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid
      // ...
    } else {
      setStateIsLoggedIn(false)
      // User is signed out
      // ...
    }
  })

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        {/* <BrowserRouter> must switch router here
          <Router />
        </BrowserRouter> 
        Must add layouts -  for example: layout with header when user is already loggedin 
        */}
        {!isLoggedIn ? (
          <Authentication />
        ) : (
          <div>
            <Header />
            <SummaryTable />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
