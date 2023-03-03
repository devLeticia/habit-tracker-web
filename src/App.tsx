import './styles/global.css'
import './lib/dayjs'
import { Header } from './components/Header'
import { SummaryTable } from './components/SummaryTable'
import { SignIn } from './views/signIn'
import { useEffect, useState } from 'react'
import { auth } from './services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import jwt from './auth/index.js'

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
        {!isLoggedIn ? (
          <SignIn />
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
