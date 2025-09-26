import { useState } from 'react'
import { useData } from '../contexts/DataContext'
import FormProcesso from '../components/FormProcesso'

export default function Processos() {
  const { processos, loading, error } = useData()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingProcesso, setEditingProcesso] = useState(null)

  // Filtrar processos baseado na busca e status
  const filteredProcessos = processos.filter(processo => {
    const matchesSearch = processo.numero.toLowerCase().includes(search.toLowerCase()) ||
                         processo.cliente.toLowerCase().includes(search.toLowerCase()) ||
                         processo.assunto.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'all' || processo.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleNewProcesso = () => {
    setEditingProcesso(null)
    setShowForm(true)
  }

  const handleEditProcesso = (processo) => {
    setEditingProcesso(processo)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingProcesso(null)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
        <div className="flex items-center justify-center py-12">
          <div className="text-white text-xl">Carregando processos...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
        <div className="bg-red-900/50 border border-red-500/30 rounded-md p-6">
          <p className="text-red-300">Erro ao carregar processos: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="card-glass p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Processos</h1>
          <button
            onClick={handleNewProcesso}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 glass"
          >
            Novo Processo
          </button>
        </div>
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Pesquisar processos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 text-sm flex-1 placeholder-gray-400"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 text-sm"
          >
            <option className="bg-gray-700 text-white">Todos</option>
            <option className="bg-gray-700 text-white">Ativo</option>
            <option className="bg-gray-700 text-white">Arquivado</option>
            <option className="bg-gray-700 text-white">Pendente</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Número</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Assunto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Advogado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-gray-600">
              {filteredProcessos.length > 0 ? (
                filteredProcessos.map((proc) => (
                  <tr key={proc.id} className="hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{proc.numero}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{proc.cliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{proc.assunto}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        proc.status === 'Ativo' ? 'bg-blue-900/30 text-blue-300' :
                        proc.status === 'Pendente' ? 'bg-yellow-900/30 text-yellow-300' :
                        'bg-gray-700/50 text-gray-300'
                      }`}>
                        {proc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{proc.advogado}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(proc.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-indigo-400 hover:text-indigo-300 mr-3">Ver</button>
                      <button
                        onClick={() => handleEditProcesso(proc)}
                        className="text-indigo-400 hover:text-indigo-300 mr-3"
                      >
                        Editar
                      </button>
                      <button className="text-red-400 hover:text-red-300">Excluir</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                    {search || statusFilter !== 'all' ? 'Nenhum processo encontrado' : 'Nenhum processo cadastrado'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formulário Modal */}
      {showForm && (
        <FormProcesso
          processo={editingProcesso}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}
