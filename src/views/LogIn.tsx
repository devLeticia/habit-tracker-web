import { GoogleLogo, TwitterLogo } from 'phosphor-react'
import { auth } from '../services/firebase'
import { useState } from 'react'
import Divider from './../components/Divider'
import { GoogleSignInButton } from './../components/auth/GoogleSignInButton'
import { TwitterSignInButton } from './../components/auth/TwitterSignInButton'
import {
  getIdToken,
  GoogleAuthProvider,
  TwitterAuthProvider,
  signInWithPopup,
  User,
  sendPasswordResetEmail,
} from 'firebase/auth'

interface LogInProps {
  handleComponentToShow: (component: string) => any
}

export function LogIn({ handleComponentToShow }: LogInProps) {
  const [user, setUser] = useState<User>({} as User)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleShowPasswordResetEmail() {
    console.log('Tell UI to show reset password component')
  }

  return (
    <div className='mt-10'>
      <span>login</span>
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
      <div
        onClick={handleComponentToShow('FORGOT_PASSWORD')}
        className='mt-3 w-full text-right text-sm cursor-pointer  text-violet-500 hover:text-violet-400 '
      >
        Forgot the password?
      </div>
      <Divider />
      <div>
        <TwitterSignInButton />
        <GoogleSignInButton />
      </div>
    </div>
  )
}
