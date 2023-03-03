import { GoogleLogo, TwitterLogo } from 'phosphor-react'
import { auth } from '../services/firebase'
import { useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  getIdToken,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from 'firebase/auth'

export function SignIn() {
  const [userName, setUserName] = useState('')
  const [user, setUser] = useState<User>({} as User)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authStatus, setAuthStatus] = useState('')

  function handleCreateUser() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        console.log('Salvou')
        const user = userCredential.user
        console.log(user)
        updateFirebaseProfile(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log('erro:', errorCode, errorMessage)
        // ..
      })
  }

  function updateFirebaseProfile(user: User) {
    console.log('foi colocar o nome')
    updateProfile(user, {
      displayName: userName,
    })
      .then(() => {
        // Profile updated!
        // ...
        console.log('profile updated')
        console.log(auth.currentUser)
      })
      .catch((error) => {
        // An error occurred
        // ...
      })
  }

  function handleSignInWithEmailAndPassword() {
    signInWithEmailAndPassword(auth, email, password)
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

  function handleSendPasswordResetEmail() {
    console.log('Sending password reset email', email)
    sendPasswordResetEmail(auth, email)
      .then((res) => {
        console.log('Password reset email sent!')
        console.log('Response', res)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })
  }

  function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result)
        const token = await getIdToken(result.user)
        localStorage.setItem('authtoken', token)
        console.log('token', token)
        setUser(result.user)
      })
      .catch((error) => {
        console
      })
  }

  return (
    <div className='flex justify-center items-center text-center transition-transform'>
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
          placeholder='Email'
          className='block w-full p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900'
          autoFocus
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type='text'
          id='email'
          placeholder='Password'
          className='block w-full p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900'
          autoFocus
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <span
          className='text-sm float-right mt-3 cursor-pointer  text-violet-500 hover:text-violet-400 '
          onClick={handleSendPasswordResetEmail}
        >
          Esqueci a senha
        </span>
        <button
          type='button'
          className='w-full mt-12 font-semibold flex justify-center items-center
           bg-violet-500  hover:bg-violet-400 gap-3 py-4 rounded-lg transition-colors duration-150'
          onClick={handleCreateUser}
        >
          Criar Conta
        </button>
        <div className='border border-1 border-zinc-800 w-full my-6'></div>
        <button
          type='button'
          className='w-full mt-6 font-semibold flex justify-center items-center bg-blue-500  hover:bg-blue-400 gap-3 py-4 rounded-lg transition-colors duration-150'
          onClick={handleGoogleSignIn}
        >
          <TwitterLogo type='' size={20} weight='fill' />
          Entrar com Twitter
        </button>

        <button
          type='button'
          className='w-full mt-6 font-semibold flex justify-center items-center bg-red-500 hover:bg-red-400 gap-3 py-4 rounded-lg transition-colors duration-150'
          onClick={handleGoogleSignIn}
        >
          <GoogleLogo size={24} weight='bold' />
          Entrar com Google
        </button>
      </div>
    </div>
  )
}
