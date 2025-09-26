export default function GestaoRelatorios() {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar - same as RelatoriosAtividades but active on Gestão */}
        <aside className="w-64 bg-gray-800/50 backdrop-blur-md shadow-lg pr-6 border-r border-gray-700/50">
          <nav className="py-5">
            <div className="space-y-1">
              <div className="px-3 mb-4">
                <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">Categorias</h2>
              </div>
              <details className="group open">
                <summary className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium text-indigo-400 bg-indigo-900/20 hover:bg-indigo-800/30">
                  <span className="mr-3">📊</span>
                  Gestão
                  <svg className={`ml-auto h-5 w-5 transition rotate-180`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </summary>
                <nav className="mt-2 px-4 space-y-1 bg-indigo-900/10 rounded">
                  <a href="#" className="text-indigo-300 hover:text-indigo-200 block py-1">Relatório de Gestão</a>
                  <a href="#" className="text-indigo-300 hover:text-indigo-200 block py-1">Relatório Financeiro</a>
                </nav>
              </details>
              <details className="group">
                <summary className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700/50">
                  <span className="mr-3">📈</span>
                  Atividades
                  <svg className={`ml-auto h-5 w-5 transition`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </summary>
                <nav className="mt-2 px-4 space-y-1 bg-gray-700/30 rounded">
                  <a href="#" className="text-gray-300 hover:text-white block py-1">Relatório de Tarefas</a>
                </nav>
              </details>
              <details className="group">
                <summary className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700/50">
                  <span className="mr-3">⚖️</span>
                  Processos
                  <svg className={`ml-auto h-5 w-5 transition`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </summary>
                <nav className="mt-2 px-4 space-y-1 bg-gray-700/30 rounded">
                  <a href="#" className="text-gray-300 hover:text-white block py-1">Relatório Processual</a>
                </nav>
              </details>
              <a href="#" className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700/50">
                <span className="mr-3">💰</span>
                Financeiro
              </a>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-6">
          <div className="card-glass p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Relatórios de Gestão</h2>
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Você não possui relatórios gerados de gestão</h3>
              <p className="text-gray-300">Gere seus primeiros relatórios para visualizar aqui.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
