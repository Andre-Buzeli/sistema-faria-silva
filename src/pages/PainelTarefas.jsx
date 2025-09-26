import { useState } from 'react'

export default function PainelTarefas() {
  const [selectedKanban, setSelectedKanban] = useState('Meu Painel')
  const [showNewDropdown, setShowNewDropdown] = useState(false)

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
      {/* Toolbar */}
      <div className="card-glass p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Painel de Tarefas</h1>
            <select
              value={selectedKanban}
              onChange={(e) => setSelectedKanban(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1 text-sm"
            >
              <option className="bg-gray-700 text-white">Meu Painel</option>
              <option className="bg-gray-700 text-white">Outro Painel</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 glass">
              Novo Painel
            </button>
            <div className="relative">
              <button
                onClick={() => setShowNewDropdown(!showNewDropdown)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center space-x-2 glass"
              >
                <span>Novo</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showNewDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-md rounded-md shadow-lg z-10 py-1 border border-gray-600">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Tarefa</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Compromisso</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Pessoa</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Panel Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-glass p-6">
          <h2 className="font-semibold text-white mb-4">Tarefas Pendentes</h2>
          <ul className="space-y-3">
            <li className="bg-gray-700/50 p-3 rounded-lg backdrop-blur-sm">Tarefa 1</li>
            <li className="bg-gray-700/50 p-3 rounded-lg backdrop-blur-sm">Tarefa 2</li>
          </ul>
        </div>
        <div className="card-glass p-6">
          <h2 className="font-semibold text-white mb-4">Tarefas em Andamento</h2>
          <ul className="space-y-3">
            <li className="bg-blue-900/30 p-3 rounded-lg backdrop-blur-sm">Tarefa em progresso</li>
          </ul>
        </div>
        <div className="card-glass p-6">
          <h2 className="font-semibold text-white mb-4">Tarefas Concluídas</h2>
          <ul className="space-y-3">
            <li className="bg-green-900/30 p-3 rounded-lg backdrop-blur-sm">Tarefa concluída</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
