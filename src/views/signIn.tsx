import { GoogleLogo, TwitterLogo } from 'phosphor-react'
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { auth } from '../services/firebase'
import { useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

// firebase.auth().currentUser.getIdToken(true)
//   .then((idToken) => {
//     client({
//     method: 'get',
//     url: '/',
//     headers: {
//       'AuthToken': idToken
//     }
const authFirebase = getAuth()
export function SignIn() {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState<User>({} as User)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleCreateUser() {
    createUserWithEmailAndPassword(authFirebase, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('erro:', errorCode, errorMessage)
        // ..
      })
  }
  function handleSignInWithEmailAndPassword() {
    signInWithEmailAndPassword(authFirebase, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        console.log('Fez login', user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('erro', errorCode, errorMessage)
      })
  }
  function handleSignOut() {
    signOut(authFirebase)
      .then((resp) => {
        console.log('fez logout')
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log('erro', error)
      })
  }

  function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user)
      })
      .catch((error) => {
        console
      })
  }

  return (
    <div className='flex justify-center items-center text-center'>
      <div className='w-full max-w-lg bg-zinc-900 rounded-xl p-10 gap-16 text-center'>
        <h1 className='font-bold text-3xl'>Create Account</h1>
        <span className='mt-6 text-zinc-400'>Your first step to succeed</span>
        <input
          type='text'
          id='userName'
          placeholder='Nome ou apelido'
          className='block w-full p-4 rounded-lg mt-8 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900'
          autoFocus
          value={userName}
          onChange={(event) => setUserName(event.target.value)}
        />
        <input
          type='text'
          id='email'
          placeholder='email@gmail.com'
          className='block w-full p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900'
          autoFocus
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type='text'
          id='email'
          placeholder='password'
          className='block w-full p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900'
          autoFocus
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button
          type='button'
          className='w-full mt-6 font-semibold flex justify-center items-center bg-violet-500 gap-3 py-4 rounded-lg'
          onClick={handleCreateUser}
        >
          Criar Conta
        </button>
        <div className='border border-1 border-zinc-800 w-full my-6'></div>
        <button
          type='button'
          className='w-full mt-6 font-semibold flex justify-center items-center bg-blue-500 gap-3 py-4 rounded-lg'
          onClick={handleGoogleSignIn}
        >
          <TwitterLogo type='' size={20} weight='fill' />
          Entrar com Twitter
        </button>

        <button
          type='button'
          className='w-full mt-6 font-semibold flex justify-center items-center bg-red-500 gap-3 py-4 rounded-lg'
          onClick={handleGoogleSignIn}
        >
          <GoogleLogo size={24} weight='bold' />
          Entrar com Google
        </button>
      </div>
    </div>
  )
}
