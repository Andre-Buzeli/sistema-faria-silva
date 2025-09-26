import { useState } from 'react'

export default function Documentos() {
  const [search, setSearch] = useState('')
  const [view, setView] = useState('list')

  const documents = [
    { name: 'Contrato.pdf', type: 'PDF', size: '1.2 MB', date: '2023-10-01' },
    { name: 'Relatorio.docx', type: 'DOCX', size: '500 KB', date: '2023-09-28' },
  ]

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="card-glass p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Documentos</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Pesquisar documentos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 text-sm w-64 placeholder-gray-400"
            />
            <button
              onClick={() => setView(view === 'list' ? 'grid' : 'list')}
              className="bg-gray-700 text-gray-300 px-3 py-2 rounded-md text-sm hover:bg-gray-600 glass"
            >
              {view === 'list' ? 'Grid' : 'List'}
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 glass">
              Upload Novo
            </button>
          </div>
        </div>

        {view === 'list' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-600">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tipo</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tamanho</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Data</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-transparent divide-y divide-gray-600">
                {documents.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{doc.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{doc.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{doc.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{doc.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-400 hover:text-indigo-300 mr-3">Ver</button>
                      <button className="text-indigo-400 hover:text-indigo-300">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documents.map((doc, idx) => (
              <div key={idx} className="card-glass p-4">
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 bg-indigo-900/30 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm">
                    <span className="text-indigo-300 font-medium">{doc.type}</span>
                  </div>
                  <h3 className="text-sm font-medium text-white truncate">{doc.name}</h3>
                  <p className="text-xs text-gray-400">{doc.size} • {doc.date}</p>
                  <div className="mt-2 space-x-2">
                    <button className="text-indigo-400 hover:text-indigo-300 text-xs">Ver</button>
                    <button className="text-indigo-400 hover:text-indigo-300 text-xs">Download</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
