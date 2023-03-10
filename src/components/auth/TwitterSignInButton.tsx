import {
    getIdToken,
    TwitterAuthProvider,
    signInWithPopup,
    User,
  } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../../services/firebase'
import { TwitterLogo } from 'phosphor-react'

export function TwitterSignInButton() {
    const [user, setUser] = useState<User>({} as User)
    
    function handleTwitterSignIn() {
        const provider = new TwitterAuthProvider()
    
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
        <button
        type='button'
        className='w-full font-semibold flex justify-center items-center bg-blue-500 hover:bg-blue-400 gap-3 py-4 rounded-lg transition-colors duration-150'
        onClick={handleTwitterSignIn}
      >
        <TwitterLogo size={24} weight='fill' />
        Entrar com Twitter
      </button>
      )
}