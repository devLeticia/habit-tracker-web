import { sendPasswordResetEmail } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../services/firebase'

interface ForgotPasswordProps {
  onChangeComponentToShow: (component: string) => any
}

export function ForgotPassword({onChangeComponentToShow}: ForgotPasswordProps) {
  const [email, setEmail] = useState('')

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
  function handleComponentToShow (componentName: string) {
    onChangeComponentToShow(componentName)
  } 

  return (
    <div>
      <input
        type='text'
        id='email'
        placeholder='Email'
        className='block w-full p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-zinc-900'
        autoFocus
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button
        type='button'
        className='w-full mt-6 font-semibold flex justify-center items-center
           bg-violet-500  hover:bg-violet-400 gap-3 py-4 rounded-lg transition-colors duration-150'
        onClick={handleSendPasswordResetEmail}
      >
        Send recover e-mail
      </button>
      <span
        onClick={() => handleComponentToShow('SING_UP')}
        className='mt-6  block text-sm cursor-pointer  text-violet-500 hover:text-violet-400'
      >
       Log In 
      </span>
    </div>
  )
}
