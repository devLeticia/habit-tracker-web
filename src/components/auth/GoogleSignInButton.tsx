import {
    getIdToken,
    GoogleAuthProvider,
    signInWithPopup,
    User,
  } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../../services/firebase'
import { GoogleLogo } from 'phosphor-react'

export function GoogleSignInButton() {
    const [user, setUser] = useState<User>({} as User)
    
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
        <button
        type='button'
        className='w-full font-semibold flex justify-center items-center bg-red-500 hover:bg-red-400 gap-3 py-4 rounded-lg transition-colors duration-150'
        onClick={handleGoogleSignIn}
      >
        <GoogleLogo size={24} weight='bold' />
        Entrar com Google
      </button>
      )
}