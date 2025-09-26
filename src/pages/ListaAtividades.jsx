import { useState } from 'react'

export default function ListaAtividades() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState('')

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="card-glass p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Lista de Atividades</h1>
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
          <div className="flex items-center space-x-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 glass">
              Nova Atividade
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Pesquisar atividades..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 text-sm w-64 placeholder-gray-400"
            />
            <select
              value={filters}
              onChange={(e) => setFilters(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 text-sm"
            >
              <option className="bg-gray-700 text-white">Todas</option>
              <option className="bg-gray-700 text-white">Pendentes</option>
              <option className="bg-gray-700 text-white">Em Andamento</option>
              <option className="bg-gray-700 text-white">Concluídas</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div className="space-y-4">
          <div className="glass dark:glass-dark p-4 rounded-xl">
            <h3 className="font-medium text-white">Atividade 1</h3>
            <p className="text-sm text-gray-300">Descrição da atividade 1. Status: Pendente</p>
          </div>
          <div className="glass dark:glass-dark p-4 rounded-xl">
            <h3 className="font-medium text-white">Atividade 2</h3>
            <p className="text-sm text-gray-300">Descrição da atividade 2. Status: Em Andamento</p>
          </div>
          {/* Add more items or empty state */}
        </div>
      </div>
    </div>
  )
}
