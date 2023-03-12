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

interface SignUpProps {
  onChangeComponentToShow: (component: string) => any
}

export function SignUp({ onChangeComponentToShow }: SignUpProps) {
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
  function handleComponentToShow(componentName: string) {
    onChangeComponentToShow(componentName)
  }

  return (
    <div>
      <input
        type='text'
        id='userName'
        placeholder='Name/nickname'
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

      <button
        type='button'
        className='w-full mt-6 font-semibold flex justify-center items-center
           bg-violet-500  hover:bg-violet-400 gap-3 py-4 rounded-lg transition-colors duration-150'
        onClick={handleCreateUser}
      >
        Criar Conta
      </button>
      <button
        type='button'
        className='w-full mt-4 border-2 border-violet-500 hover:bg-violet-800 hover:bg-opacity-20 font-semibold flex justify-center items-center gap-3 py-4 rounded-lg transition-colors duration-150'
        onClick={() => handleComponentToShow('SING_IN')}
      >
        Login
      </button>
    </div>
  )
}
