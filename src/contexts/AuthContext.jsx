import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simula carregamento inicial
    const timer = setTimeout(() => {
      // Por enquanto, simula um usuário logado
      setUser({
        id: 1,
        name: 'João Silva',
        email: 'joao@fariasilva.com',
        role: 'admin'
      })
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const login = async (email, password) => {
    try {
      // Simulação de login - em produção, isso seria uma chamada para API
      if (email === 'admin@fariasilva.com' && password === 'admin123') {
        const userData = {
          id: 1,
          name: 'João Silva',
          email: email,
          role: 'admin'
        }
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
        return { success: true }
      } else {
        return { success: false, error: 'Credenciais inválidas' }
      }
    } catch (error) {
      return { success: false, error: 'Erro no login' }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

