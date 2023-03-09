// Create account, Sign in , Reset Password

import { SignUp } from './SignUp'
import { LogIn } from './LogIn'
import { useEffect, useState } from 'react'
import { ForgotPassword } from './ForgotPassword'

interface pageHeader {
  id: string,
  title: string
  subheader: string
}
const headers = [
  {
    id: 'LOG_IN',
    title: 'Login In',
    subheader: 'A Habit a Day Keeps the Failure Away',
  },
  {
    id: 'SIGN_UP',
    title: 'Sign Up',
    subheader: 'The first step to ignite your goals!',
  },
  {
    id: 'FORGOT_PASSWORD',
    title: 'Recover Password',
    subheader: "It happens to everyone! We'll help you.",
  },
]
export function Authentication() {
  const [componentName, setComponentName] = useState<String>('')
  const [componentHeader, setComponentHeader] = useState<pageHeader>(headers[0])



  function changeComponentToShow(componentName: String) {
    setComponentName(componentName)
    const component = headers.find(header => header.id === componentName)
    if (component) setComponentHeader(component)
  }

  function showComponent(componentName: String) {
    switch (componentName) {
      case 'SIGN_IN':
        return <LogIn onChangeComponentToShow={changeComponentToShow} />
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
        <h1 className='font-bold text-3xl mb-3'>{componentHeader.title}</h1>
        <span className='mt-10 text-zinc-400'>{componentHeader.subheader}</span>
        {showComponent(componentName)}
        <button
          onClick={() => changeComponentToShow('SIGN_IN')}
          className='w-full mt-6 font-semibold flex justify-center items-center border border-violet-500 gap-3 py-4 rounded-lg transition-colors duration-150'
        >
          Voltar
        </button>
      </div>
    </div>
  )
}
