import { useState } from 'react'
import { useData } from '../contexts/DataContext'
import FormPessoa from '../components/FormPessoa'

export default function Pessoa() {
  const { pessoas, loading, error, updatePessoa, deletePessoa } = useData()
  const [search, setSearch] = useState('')
  const [tipoFilter, setTipoFilter] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editingPessoa, setEditingPessoa] = useState(null)

  // Filtrar pessoas baseado na busca e tipo
  const filteredPessoas = pessoas.filter(pessoa => {
    const matchesSearch = pessoa.nome.toLowerCase().includes(search.toLowerCase()) ||
                         pessoa.email.toLowerCase().includes(search.toLowerCase()) ||
                         pessoa.cpf.toLowerCase().includes(search.toLowerCase())

    const matchesTipo = tipoFilter === 'all' || pessoa.tipo === tipoFilter

    return matchesSearch && matchesTipo
  })

  const handleNewPessoa = () => {
    setEditingPessoa(null)
    setShowForm(true)
  }

  const handleEditPessoa = (pessoa) => {
    setEditingPessoa(pessoa)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingPessoa(null)
  }

  const handleDeletePessoa = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta pessoa?')) {
      const result = await deletePessoa(id)
      if (!result.success) {
        alert(result.error)
      }
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
        <div className="flex items-center justify-center py-12">
          <div className="text-white text-xl">Carregando pessoas...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
        <div className="bg-red-900/50 border border-red-500/30 rounded-md p-6">
          <p className="text-red-300">Erro ao carregar pessoas: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="card-glass p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Gestão de Pessoas</h1>
          <button
            onClick={handleNewPessoa}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 glass"
          >
            Nova Pessoa
          </button>
        </div>
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Pesquisar pessoas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 text-sm flex-1 placeholder-gray-400"
          />
          <select
            value={tipoFilter}
            onChange={(e) => setTipoFilter(e.target.value)}
            className="bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 text-sm"
          >
            <option className="bg-gray-700 text-white">Todos</option>
            <option className="bg-gray-700 text-white">Cliente</option>
            <option className="bg-gray-700 text-white">Advogado</option>
            <option className="bg-gray-700 text-white">Funcionário</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">CPF</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Telefone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ações</th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-gray-600">
              {filteredPessoas.length > 0 ? (
                filteredPessoas.map((pessoa) => (
                  <tr key={pessoa.id} className="hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{pessoa.nome}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{pessoa.cpf}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{pessoa.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{pessoa.telefone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        pessoa.tipo === 'Cliente' ? 'bg-blue-900/30 text-blue-300' :
                        pessoa.tipo === 'Advogado' ? 'bg-green-900/30 text-green-300' :
                        'bg-gray-700/50 text-gray-300'
                      }`}>
                        {pessoa.tipo}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditPessoa(pessoa)}
                        className="text-indigo-400 hover:text-indigo-300 mr-3"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletePessoa(pessoa.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                    {search || tipoFilter !== 'all' ? 'Nenhuma pessoa encontrada' : 'Nenhuma pessoa cadastrada'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formulário Modal */}
      {showForm && (
        <FormPessoa
          pessoa={editingPessoa}
          onClose={handleCloseForm}
        />
      )}
    </div>
  )
}