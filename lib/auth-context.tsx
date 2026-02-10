"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type User = {
  name: string
  login: string
  avatar: string
  email: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signInWithGitHub: () => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEMO_USER: User = {
  name: "Jane Developer",
  login: "janedev",
  avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=janedev",
  email: "jane@example.com",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const signInWithGitHub = useCallback(() => {
    setIsLoading(true)
    // Simulate OAuth redirect delay
    setTimeout(() => {
      setUser(DEMO_USER)
      setIsLoading(false)
    }, 1500)
  }, [])

  const signOut = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGitHub, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
