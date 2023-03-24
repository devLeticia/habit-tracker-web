import './styles/global.css'
import './lib/dayjs'
import { useEffect, useState } from 'react'
import { auth } from './services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import jwt from './auth/index'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { AuthContextProvider } from './contexts/AuthContext'

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
    <div>
      <BrowserRouter>
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
