import { useState } from 'react'
import { useData } from '../contexts/DataContext'

export default function Timesheet() {
  const { pessoas } = useData()
  const [selectedUser, setSelectedUser] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showTimer, setShowTimer] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  // Dados mockados de timesheet
  const timesheetEntries = [
    {
      id: 1,
      user: 'João Silva',
      date: '2023-10-01',
      startTime: '09:00',
      endTime: '12:00',
      duration: '3h 00m',
      task: 'Revisar processo 001/2023',
      client: 'Maria Santos',
      status: 'Completo'
    },
    {
      id: 2,
      user: 'João Silva',
      date: '2023-10-01',
      startTime: '14:00',
      endTime: '16:30',
      duration: '2h 30m',
      task: 'Preparar petição inicial',
      client: 'Pedro Oliveira',
      status: 'Completo'
    },
    {
      id: 3,
      user: 'João Silva',
      date: '2023-10-02',
      startTime: '10:00',
      endTime: null,
      duration: 'Em andamento',
      task: 'Análise de documentos',
      client: 'Ana Costa',
      status: 'Ativo'
    }
  ]

  const startTimer = () => {
    setIsRunning(true)
    setShowTimer(true)
  }

  const pauseTimer = () => {
    setIsRunning(false)
  }

  const stopTimer = () => {
    setIsRunning(false)
    setCurrentTime(0)
    setShowTimer(false)
  }

  // Timer effect
  React.useEffect(() => {
    let interval
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentTime(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Filtrar entradas por usuário e data
  const filteredEntries = timesheetEntries.filter(entry => {
    const matchesUser = !selectedUser || entry.user === selectedUser
    const matchesDate = !selectedDate || entry.date === selectedDate
    return matchesUser && matchesDate
  })

  // Calcular total de horas
  const totalHours = filteredEntries
    .filter(entry => entry.duration !== 'Em andamento')
    .reduce((total, entry) => {
      const [hours, minutes] = entry.duration.split('h ')
      return total + parseInt(hours) + (parseInt(minutes) / 60)
    }, 0)

  const advogados = pessoas.filter(p => p.tipo === 'Advogado')

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 dark:bg-gray-900">
      <div className="card-glass p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Timesheet</h1>
          <div className="flex space-x-3">
            {!showTimer ? (
              <button
                onClick={startTimer}
                className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 glass"
              >
                Iniciar Timer
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={isRunning ? pauseTimer : startTimer}
                  className={`px-4 py-2 rounded-md text-sm font-medium glass ${
                    isRunning ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  {isRunning ? 'Pausar' : 'Continuar'}
                </button>
                <button
                  onClick={stopTimer}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 glass"
                >
                  Parar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Timer Display */}
        {showTimer && (
          <div className="mb-6 p-4 bg-gray-700/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-mono font-bold text-white mb-1">
                  {formatTime(currentTime)}
                </div>
                <div className="text-sm text-gray-400">Tempo decorrido</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-400">Status</div>
                <div className={`text-sm font-medium ${isRunning ? 'text-green-300' : 'text-yellow-300'}`}>
                  {isRunning ? 'Executando' : 'Pausado'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filtros */}
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">Advogado</label>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 text-sm"
            >
              <option value="">Todos os advogados</option>
              {advogados.map(adv => (
                <option key={adv.id} value={adv.nome}>{adv.nome}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">Data</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="card-glass p-4 text-center">
            <div className="text-2xl font-bold text-white mb-1">{filteredEntries.length}</div>
            <div className="text-sm text-gray-400">Total de Entradas</div>
          </div>
          <div className="card-glass p-4 text-center">
            <div className="text-2xl font-bold text-blue-300 mb-1">{totalHours.toFixed(1)}h</div>
            <div className="text-sm text-gray-400">Horas Trabalhadas</div>
          </div>
          <div className="card-glass p-4 text-center">
            <div className="text-2xl font-bold text-green-300 mb-1">
              {filteredEntries.filter(e => e.status === 'Completo').length}
            </div>
            <div className="text-sm text-gray-400">Tarefas Concluídas</div>
          </div>
        </div>

        {/* Tabela de Timesheet */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Advogado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Horário</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Duração</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Tarefa</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-transparent divide-y divide-gray-600">
              {filteredEntries.length > 0 ? (
                filteredEntries.map((entry) => (
                  <tr key={entry.id} className="hover:bg-gray-700/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{entry.user}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {new Date(entry.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {entry.startTime} {entry.endTime ? `- ${entry.endTime}` : '- Em andamento'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{entry.duration}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{entry.task}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{entry.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        entry.status === 'Completo' ? 'bg-green-900/30 text-green-300' :
                        entry.status === 'Ativo' ? 'bg-blue-900/30 text-blue-300' :
                        'bg-gray-700/50 text-gray-300'
                      }`}>
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-400">
                    Nenhuma entrada encontrada para os filtros selecionados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
