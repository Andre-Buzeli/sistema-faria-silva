import { useState } from 'react'

export default function Intimacao() {
  const [search, setSearch] = useState('')

  const intimacoes = [
    { id: 1, processo: '001/2023', tipo: 'Citação', data: '2023-10-15', status: 'Recebida', remetente: 'Tribunal' },
    { id: 2, processo: '002/2023', tipo: 'Intimação', data: '2023-10-10', status: 'Pendente', remetente: 'Advogado' },
  ]

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="card-glass p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Intimações</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Pesquisar intimações..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 text-sm w-full max-w-md placeholder-gray-400"
          />
        </div>
        <div className="space-y-4">
          {intimacoes.map((intimacao) => (
            <div key={intimacao.id} className="glass dark:glass-dark border border-gray-600/50 rounded-xl p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white">{intimacao.processo} - {intimacao.tipo}</h3>
                  <p className="text-sm text-gray-400">Data: {intimacao.data}</p>
                  <p className="text-sm text-gray-400">Remetente: {intimacao.remetente}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  intimacao.status === 'Recebida' ? 'bg-green-900/30 text-green-300' : 'bg-yellow-900/30 text-yellow-300'
                }`}>
                  {intimacao.status}
                </span>
              </div>
              <div className="mt-3 flex space-x-2">
                <button className="text-indigo-400 hover:text-indigo-300 text-sm glass">Visualizar</button>
                <button className={`text-sm ${
                  intimacao.status === 'Pendente' ? 'text-green-400 hover:text-green-300' : 'text-gray-500'
                } glass`}>
                  {intimacao.status === 'Pendente' ? 'Marcar como Lida' : 'Lida'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
