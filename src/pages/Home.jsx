import { useData } from '../contexts/DataContext'

export default function Home() {
  const { processos, atendimentos, loading, error } = useData()

  // Calcular estatísticas
  const processosAtivos = processos.filter(p => p.status === 'Ativo').length
  const atendimentosPendentes = atendimentos.filter(a => a.status === 'Pendente').length
  const atividadesRecentes = [...processos, ...atendimentos]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 5)

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-white text-xl">Carregando dashboard...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-red-900/50 border border-red-500/30 rounded-md p-6">
          <p className="text-red-300">Erro ao carregar dados: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="glass dark:glass-dark border-4 border-white/20 dark:border-gray-700/50 rounded-2xl p-8 mb-8 backdrop-blur-md">
          <h1 className="text-3xl font-bold text-white dark:text-gray-100 mb-4">Bem-vindo ao Sistema Faria-Silva</h1>
          <p className="text-lg text-gray-300 dark:text-gray-400 mb-8">Dashboard principal com visão geral das atividades.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-glass p-6">
              <h3 className="text-sm font-medium text-gray-400">Processos Ativos</h3>
              <p className="text-3xl font-bold text-white mt-2">{processosAtivos}</p>
            </div>
            <div className="card-glass p-6">
              <h3 className="text-sm font-medium text-gray-400">Atendimentos Pendentes</h3>
              <p className="text-3xl font-bold text-red-300 mt-2">{atendimentosPendentes}</p>
            </div>
            <div className="card-glass p-6">
              <h3 className="text-sm font-medium text-gray-400">Total de Processos</h3>
              <p className="text-3xl font-bold text-blue-300 mt-2">{processos.length}</p>
            </div>
          </div>
          <div className="mt-8 glass dark:glass-dark p-6 rounded-xl">
            <h3 className="text-lg font-medium text-white mb-4">Atividades Recentes</h3>
            {atividadesRecentes.length > 0 ? (
              <ul className="space-y-2">
                {atividadesRecentes.map((atividade, index) => (
                  <li key={atividade.id || index} className="flex items-center justify-between p-3 bg-white/5 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                    <span className="text-gray-300">
                      {atividade.numero ? `Processo ${atividade.numero}` : atividade.assunto}
                      {atividade.status && ` - ${atividade.status}`}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(atividade.data).toLocaleDateString('pt-BR')}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400 text-center py-4">Nenhuma atividade recente</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
