// Create account, Sign in , Reset Password

import { SignUp } from './SignUp'
import { LogIn } from './LogIn'
import { useEffect, useState } from 'react'
import { ForgotPassword } from './ForgotPassword'

interface pageHeader {
  title: string
  subheader: string
}
const headers = {
  LOG_IN: {
    title: 'Login In',
    subheader: 'A Habit a Day Keeps the Failure Away',
  },
  SIGN_UP: {
    title: 'Sign Up',
    subheader: 'The first step to ignite your goals!',
  },
  FORGOT_PASSWORD: {
    title: 'Recover Password',
    subheader: "It happens to everyone! We'll help you.",
  },
}
export function Authentication() {
  const [componentName, setComponentName] = useState<String>('FORGOT_PASSWORD')
  const [updateComponent, setUpdateComponent] = useState<Boolean>(false)
  let pageHeader = headers.FORGOT_PASSWORD

  useEffect(() => {
    handleComponentToShow(componentName)
  }, [updateComponent])

  function handleComponentToShow(componentName: String) {
    setComponentName(componentName)
  }

  function showComponent(componentName: String) {
    switch (componentName) {
      case 'SIGN_IN':
        return <LogIn handleComponentToShow={handleComponentToShow} />
      case 'SIGN_UP':
        return <SignUp />
      case 'FORGOT_PASSWORD':
        return <ForgotPassword />
      default:
        return <SignUp />
    }
  }
  return (
    <div className='flex justify-center items-center text-center transition-transform'>
      <div className='w-full max-w-lg bg-zinc-900 rounded-xl p-10 gap-16 text-center'>
        <h1 className='font-bold text-3xl mb-3'>{pageHeader.title}</h1>
        <span className='mt-10 text-zinc-400'>{pageHeader.subheader}</span>
        {showComponent(componentName)}
        <button
          onClick={() => handleComponentToShow('SIGN_IN')}
          className='w-full mt-6 font-semibold flex justify-center items-center border border-violet-500 gap-3 py-4 rounded-lg transition-colors duration-150'
        >
          Voltar
        </button>
      </div>
    </div>
  )
}
