import React, { useState } from 'react'
import { Routes, Route, Link, NavLink, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Home from './pages/Home'
import Kanban from './pages/Kanban'
import ListaAtividades from './pages/ListaAtividades'
import PainelTarefas from './pages/PainelTarefas'
import RelatoriosAtividades from './pages/RelatoriosAtividades'
import Documentos from './pages/Documentos'
import Atendimento from './pages/Atendimento'
import Pessoa from './pages/Pessoa'
import GestaoRelatorios from './pages/GestaoRelatorios'
import Timesheet from './pages/Timesheet'
import Andamento from './pages/Andamento'
import Monitoramento from './pages/Monitoramento'
import ProcesoRelatorio from './pages/ProcesoRelatorio'
import Intimacao from './pages/Intimacao'
import Processos from './pages/Processos'
import Login from './pages/Login'

// Profile Dropdown Component
function ProfileDropdown({ isOpen, setIsOpen, toggleDarkMode, darkMode, user, logout }) {
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        <img src="https://via.placeholder.com/32" alt="Profile" className="w-8 h-8 rounded-full" />
        <span className="hidden sm:inline text-sm font-medium">{user?.name || 'Usuário'}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50 py-1 glass-dark">
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
            <div className="font-medium">{user?.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</div>
          </div>
          <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Perfil</Link>
          <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Configurações</Link>
          <button
            onClick={toggleDarkMode}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? 'Modo Claro' : 'Modo Escuro'}
          </button>
          <hr className="my-1 border-gray-200 dark:border-gray-600" />
          <button
            onClick={logout}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            Sair
          </button>
        </div>
      )}
    </div>
  )
}

// Main App
function App() {
  const { user, loading: authLoading, logout } = useAuth()
  const [darkMode, setDarkMode] = useState(true) // Default dark
  const [profileOpen, setProfileOpen] = useState(false)

  // Apply dark mode class
  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => setDarkMode(!darkMode)

  // Loading screen
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Carregando Sistema Faria-Silva...</div>
      </div>
    )
  }

  // Se não estiver autenticado, mostrar login
  if (!user) {
    return <Login />
  }

  // Sub-menu data
  const subMenus = {
    gestao: [
      { path: '/gestao/atendimento', label: 'Atendimento' },
      { path: '/gestao/pessoa', label: 'Pessoa' },
      { path: '/gestao/relatorios', label: 'Relatórios' },
      { path: '/gestao/timesheet', label: 'Timesheet' },
    ],
    atividades: [
      { path: '/atividades/kanban', label: 'Kanban' },
      { path: '/atividades/lista', label: 'Lista' },
      { path: '/atividades/painel-tarefas', label: 'Painel de Tarefas' },
      { path: '/atividades/relatorios', label: 'Relatórios' },
    ],
    processos: [
      { path: '/processos/andamento', label: 'Andamento' },
      { path: '/processos/monitoramento', label: 'Monitoramento' },
      { path: '/processos/relatorio', label: 'Relatório' },
      { path: '/processos/intimacao', label: 'Intimação' },
      { path: '/processos', label: 'Processos' },
    ],
    documentos: [{ path: '/documentos', label: 'Documentos' }],
  }

  const [activeSubMenu, setActiveSubMenu] = useState(null)

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      {/* Top Navigation Bar with Glassmorphism */}
      <nav className="glass dark:glass-dark fixed w-full top-0 z-50 shadow-lg backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Sistema Faria-Silva</h1>
              <div className="hidden md:flex space-x-8">
                {Object.keys(subMenus).map((key) => (
                  <div key={key} className="relative group">
                    <NavLink
                      to={`/${key}`}
                      onMouseEnter={() => setActiveSubMenu(key)}
                      onMouseLeave={() => setActiveSubMenu(null)}
                      className={({ isActive }) =>
                        `py-2 px-3 border-b-2 font-medium text-sm rounded-t-lg ${
                          isActive
                            ? 'border-indigo-500 text-indigo-400 dark:text-indigo-300'
                            : 'text-gray-300 dark:text-gray-400 hover:text-white hover:border-gray-300'
                        }`
                      }
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </NavLink>
                    {activeSubMenu === key && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-md shadow-lg z-50 py-1 border border-white/20 dark:border-gray-700/50">
                        {subMenus[key].map((item) => (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                              `block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                isActive ? 'bg-indigo-100 dark:bg-indigo-900' : ''
                              }`
                            }
                            onClick={() => setActiveSubMenu(null)}
                          >
                            {item.label}
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <ProfileDropdown
              isOpen={profileOpen}
              setIsOpen={setProfileOpen}
              toggleDarkMode={toggleDarkMode}
              darkMode={darkMode}
              user={user}
              logout={logout}
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 p-4"> {/* Offset for fixed nav */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gestao/*" element={<GestaoOutlet />} /> {/* Nested for sub-routes if needed */}
          <Route path="/atividades/*" element={<AtividadesOutlet />} />
          <Route path="/processos/*" element={<ProcessosOutlet />} />
          <Route path="/documentos" element={<Documentos />} />
          {/* Individual routes */}
          <Route path="/gestao/atendimento" element={<Atendimento />} />
          <Route path="/gestao/pessoa" element={<Pessoa />} />
          <Route path="/gestao/relatorios" element={<GestaoRelatorios />} />
          <Route path="/gestao/timesheet" element={<Timesheet />} />
          <Route path="/atividades/kanban" element={<Kanban />} />
          <Route path="/atividades/lista" element={<ListaAtividades />} />
          <Route path="/atividades/painel-tarefas" element={<PainelTarefas />} />
          <Route path="/atividades/relatorios" element={<RelatoriosAtividades />} />
          <Route path="/processos/andamento" element={<Andamento />} />
          <Route path="/processos/monitoramento" element={<Monitoramento />} />
          <Route path="/processos/relatorio" element={<ProcesoRelatorio />} />
          <Route path="/processos/intimacao" element={<Intimacao />} />
          <Route path="/processos" element={<Processos />} />
        </Routes>
      </main>
    </div>
  )
}

// Placeholder outlets for nested routes (can be expanded)
function GestaoOutlet() { return <div>Gestão Section</div>; }
function AtividadesOutlet() { return <div>Atividades Section</div>; }
function ProcessosOutlet() { return <div>Processos Section</div>; }

export default App
