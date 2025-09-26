import { useState } from 'react'

export default function Kanban() {
  const [view, setView] = useState('Kanban')
  const [selectedKanban, setSelectedKanban] = useState('Meu Kanban')
  const [showCronometer, setShowCronometer] = useState(false)
  const [showNewDropdown, setShowNewDropdown] = useState(false)

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      {/* Toolbar */}
      <div className="card-glass p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-white">Kanban de Tarefas</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setView('Kanban')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${view === 'Kanban' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Kanban
              </button>
              <button
                onClick={() => setView('Painel')}
                className={`px-3 py-1 rounded-md text-sm font-medium ${view === 'Painel' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Painel
              </button>
            </div>
            <select
              value={selectedKanban}
              onChange={(e) => setSelectedKanban(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-1 text-sm"
            >
              <option className="bg-gray-700 text-white">Meu Kanban</option>
              <option className="bg-gray-700 text-white">Outro Kanban</option>
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 glass">
              Novo quadro
            </button>
            <button
              onClick={() => setShowCronometer(!showCronometer)}
              className="text-gray-300 hover:text-white"
            >
              ⏱️
            </button>
            {showCronometer && (
              <div className="text-sm text-gray-300">00:00:00</div>
            )}
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
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Processo</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Tarefa</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Compromisso</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Pessoa</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Atendimento</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna A Fazer */}
        <div className="card-glass p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-white">A Fazer</h3>
            <span className="bg-gray-600 text-gray-300 text-xs px-2 py-1 rounded-full">3</span>
          </div>
          <div className="space-y-3">
            <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 cursor-move hover:bg-gray-600/50 transition-colors">
              <h4 className="text-sm font-medium text-white mb-1">Revisar processo 001/2023</h4>
              <p className="text-xs text-gray-400 mb-2">Cliente: João Silva</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-yellow-900/30 text-yellow-300 px-2 py-1 rounded">Média</span>
                <span className="text-xs text-gray-500">2 dias</span>
              </div>
            </div>
            <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600 cursor-move hover:bg-gray-600/50 transition-colors">
              <h4 className="text-sm font-medium text-white mb-1">Preparar petição inicial</h4>
              <p className="text-xs text-gray-400 mb-2">Cliente: Maria Santos</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-red-900/30 text-red-300 px-2 py-1 rounded">Alta</span>
                <span className="text-xs text-gray-500">Hoje</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Em Andamento */}
        <div className="card-glass p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-white">Em Andamento</h3>
            <span className="bg-blue-600 text-blue-300 text-xs px-2 py-1 rounded-full">2</span>
          </div>
          <div className="space-y-3">
            <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-600 cursor-move hover:bg-blue-800/30 transition-colors">
              <h4 className="text-sm font-medium text-white mb-1">Análise de documentos</h4>
              <p className="text-xs text-gray-400 mb-2">Cliente: Pedro Oliveira</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded">Normal</span>
                <span className="text-xs text-gray-500">5 dias</span>
              </div>
            </div>
          </div>
        </div>

        {/* Coluna Concluído */}
        <div className="card-glass p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-white">Concluído</h3>
            <span className="bg-green-600 text-green-300 text-xs px-2 py-1 rounded-full">5</span>
          </div>
          <div className="space-y-3">
            <div className="bg-green-900/20 p-3 rounded-lg border border-green-600 cursor-move hover:bg-green-800/30 transition-colors">
              <h4 className="text-sm font-medium text-white mb-1">Consulta inicial realizada</h4>
              <p className="text-xs text-gray-400 mb-2">Cliente: Ana Costa</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">Baixa</span>
                <span className="text-xs text-gray-500">Ontem</span>
              </div>
            </div>
            <div className="bg-green-900/20 p-3 rounded-lg border border-green-600 cursor-move hover:bg-green-800/30 transition-colors">
              <h4 className="text-sm font-medium text-white mb-1">Processo 002/2023 arquivado</h4>
              <p className="text-xs text-gray-400 mb-2">Cliente: Carlos Lima</p>
              <div className="flex items-center justify-between">
                <span className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded">Normal</span>
                <span className="text-xs text-gray-500">3 dias</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas do Kanban */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-glass p-4 text-center">
          <div className="text-2xl font-bold text-white mb-1">10</div>
          <div className="text-sm text-gray-400">Total de Tarefas</div>
        </div>
        <div className="card-glass p-4 text-center">
          <div className="text-2xl font-bold text-yellow-300 mb-1">3</div>
          <div className="text-sm text-gray-400">A Fazer</div>
        </div>
        <div className="card-glass p-4 text-center">
          <div className="text-2xl font-bold text-blue-300 mb-1">2</div>
          <div className="text-sm text-gray-400">Em Andamento</div>
        </div>
        <div className="card-glass p-4 text-center">
          <div className="text-2xl font-bold text-green-300 mb-1">5</div>
          <div className="text-sm text-gray-400">Concluídas</div>
        </div>
      </div>
    </div>
  )
}
