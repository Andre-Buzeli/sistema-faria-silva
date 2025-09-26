export default function Monitoramento() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
      <h1 className="text-2xl font-bold text-white mb-6">Monitoramento de Processos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="card-glass p-6">
          <h3 className="text-sm font-medium text-gray-400">Processos Ativos</h3>
          <p className="text-3xl font-bold text-white mt-2">45</p>
        </div>
        <div className="card-glass p-6">
          <h3 className="text-sm font-medium text-gray-400">Pendências</h3>
          <p className="text-3xl font-bold text-red-300 mt-2">12</p>
        </div>
        <div className="card-glass p-6">
          <h3 className="text-sm font-medium text-gray-400">Audiências Hoje</h3>
          <p className="text-3xl font-bold text-blue-300 mt-2">3</p>
        </div>
        <div className="card-glass p-6">
          <h3 className="text-sm font-medium text-gray-400">Concluídos</h3>
          <p className="text-3xl font-bold text-green-300 mt-2">28</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-glass p-6">
          <h3 className="text-lg font-medium text-white mb-4">Gráfico de Status</h3>
          <div className="h-64 bg-gray-800/50 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <p className="text-gray-400">Placeholder para gráfico de status dos processos</p>
          </div>
        </div>
        <div className="card-glass p-6">
          <h3 className="text-lg font-medium text-white mb-4">Alertas</h3>
          <div className="space-y-4">
            <div className="bg-red-900/20 border border-red-500/30 rounded p-4 glass">
              <h4 className="font-medium text-red-300">Prazo vencendo: Processo 001</h4>
              <p className="text-sm text-red-400">Audiência amanhã</p>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded p-4 glass">
              <h4 className="font-medium text-yellow-300">Documento pendente: Processo 002</h4>
              <p className="text-sm text-yellow-400">Aguardando assinatura</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
