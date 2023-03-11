import { GoogleLogo, TwitterLogo } from 'phosphor-react'
import { auth } from '../services/firebase'
import { useState, FormEvent, ChangeEvent, InvalidEvent} from 'react'
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
  onChangeComponentToShow: (component: string) => any
}

export function LogIn({ onChangeComponentToShow }: LogInProps) {
  const [user, setUser] = useState<User>({} as User)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleComponentToShow (componentName: string) {
    onChangeComponentToShow(componentName)
  } 
  function handleShowPasswordResetEmail() {
    console.log('Tell UI to show reset password component')
  }

  function handleEmailChange (event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setEmail(event.target.value)
  }
  function handleEmailInvalid (event: InvalidEvent<HTMLInputElement>) {
     event.target.setCustomValidity('Campo obrigatório')
  }

  function handlePasswordChange (event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setPassword(event.target.value)
  }
  
  function handlePasswordInvalid(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Campo obrigatório')
  }

  return (
    <div className='mt-10'>
      <input
        type='text'
        id='email'
        placeholder='Email'
        className='block w-full p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900'
        autoFocus
        value={email}
        onInvalid={handleEmailInvalid}
        onChange={handleEmailChange}
        required
      />
      <input
        type='text'
        id='email'
        placeholder='Password'
        className='block w-full p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900'
        autoFocus
        value={password}
        onChange={handlePasswordChange}
        required
        onInvalid={handlePasswordInvalid}
      />

      <button 
       className='w-full mt-3 font-semibold flex justify-center items-center bg-violet-500 hover:bg-violet-400 gap-3 py-4 rounded-lg transition-colors duration-150'
      //disabled={email.length <= 10}
      >
        Entrar
      </button>
      <Divider />
      <div className='flex flex-col gap-3'>
        <TwitterSignInButton />
        <GoogleSignInButton />
      </div>
      <span
        onClick={() => handleComponentToShow('FORGOT_PASSWORD')}
        className='mt-3  block text-sm cursor-pointer  text-violet-500 hover:text-violet-400'
      >
        Forgot the password?
      </span>
      <span
        onClick={() => handleComponentToShow('SIGN_UP')}
        className='mt-3  text-sm cursor-pointer  text-violet-500 hover:text-violet-400'
      >
        Create Account
      </span>
    </div>
  )
}
