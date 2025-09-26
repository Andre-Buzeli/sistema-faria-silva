import { useState } from 'react'
import { useData } from '../contexts/DataContext'
import FormAtendimento from '../components/FormAtendimento'

export default function Atendimento() {
  const { atendimentos, loading, error, updateAtendimento } = useData()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingAtendimento, setEditingAtendimento] = useState(null)

  // Filtrar atendimentos baseado na busca e status
  const filteredAtendimentos = atendimentos.filter(atendimento => {
    const matchesSearch = atendimento.cliente.toLowerCase().includes(search.toLowerCase()) ||
                         atendimento.assunto.toLowerCase().includes(search.toLowerCase()) ||
                         (atendimento.responsavel && atendimento.responsavel.toLowerCase().includes(search.toLowerCase()))

    const matchesStatus = statusFilter === 'all' || atendimento.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleNewAtendimento = () => {
    setEditingAtendimento(null)
    setShowForm(true)
  }

  const handleEditAtendimento = (atendimento) => {
    setEditingAtendimento(atendimento)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingAtendimento(null)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
        <div className="flex items-center justify-center py-12">
          <div className="text-white text-xl">Carregando atendimentos...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
        <div className="bg-red-900/50 border border-red-500/30 rounded-md p-6">
          <p className="text-red-300">Erro ao carregar atendimentos: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="card-glass p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Gestão de Atendimento</h1>
          <button
            onClick={handleNewAtendimento}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 glass"
          >
            Novo Atendimento
          </button>
        </div>
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Pesquisar atendimentos..."
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
            <option className="bg-gray-700 text-white">Pendente</option>
            <option className="bg-gray-700 text-white">Em Andamento</option>
            <option className="bg-gray-700 text-white">Concluído</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Assunto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Responsável</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-gray-600">
              {filteredAtendimentos.length > 0 ? (
                filteredAtendimentos.map((att) => (
                  <tr key={att.id} className="hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{att.cliente}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{att.assunto}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        att.status === 'Pendente' ? 'bg-yellow-900/30 text-yellow-300' :
                        att.status === 'Em Andamento' ? 'bg-blue-900/30 text-blue-300' :
                        att.status === 'Concluído' ? 'bg-green-900/30 text-green-300' :
                        'bg-gray-700/50 text-gray-300'
                      }`}>
                        {att.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{att.responsavel || '-'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(att.data).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditAtendimento(att)}
                        className="text-indigo-400 hover:text-indigo-300 mr-3"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => updateAtendimento(att.id, { status: 'Concluído' })}
                        className="text-green-400 hover:text-green-300 mr-3"
                      >
                        Concluir
                      </button>
                      <button className="text-red-400 hover:text-red-300">Excluir</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                    {search || statusFilter !== 'all' ? 'Nenhum atendimento encontrado' : 'Nenhum atendimento cadastrado'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formulário Modal */}
      {showForm && (
        <FormAtendimento
          atendimento={editingAtendimento}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}
