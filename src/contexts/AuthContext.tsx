import { createContext, ReactNode } from 'react'

export const AuthContext = createContext({})

interface AuthContextProviderProps {
  children: ReactNode
}
export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
