import { useState } from 'react'

export default function Andamento() {
  const [search, setSearch] = useState('')

  const andamentos = [
    { id: 1, processo: 'Processo 001/2023', descricao: 'Audiência marcada para 15/11', data: '2023-10-10', status: 'Pendente' },
    { id: 2, processo: 'Processo 002/2023', descricao: 'Documento protocolado', data: '2023-10-05', status: 'Concluído' },
  ]

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="card-glass p-6">
        <h1 className="text-2xl font-bold text-white mb-6">Andamento Processual</h1>
        <div className="mb-6">
          <input
            type="text"
            placeholder="Pesquisar andamentos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 text-sm w-full max-w-md placeholder-gray-400"
          />
        </div>
        <div className="space-y-6">
          {andamentos.map((andamento) => (
            <div key={andamento.id} className="glass dark:glass-dark border border-gray-600/50 rounded-xl p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-white">{andamento.processo}</h3>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  andamento.status === 'Pendente' ? 'bg-yellow-900/30 text-yellow-300' : 'bg-green-900/30 text-green-300'
                }`}>
                  {andamento.status}
                </span>
              </div>
              <p className="text-gray-300 mb-2">{andamento.descricao}</p>
              <p className="text-sm text-gray-400">Data: {andamento.data}</p>
              <div className="mt-4 flex space-x-2">
                <button className="text-indigo-400 hover:text-indigo-300 text-sm glass">Editar</button>
                <button className="text-green-400 hover:text-green-300 text-sm glass">Concluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
