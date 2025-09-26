import React, { createContext, useState, useContext, useEffect } from 'react'

const DataContext = createContext()

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData deve ser usado dentro de um DataProvider')
  }
  return context
}

export const DataProvider = ({ children }) => {
  // Estados para diferentes tipos de dados
  const [processos, setProcessos] = useState([])
  const [atendimentos, setAtendimentos] = useState([])
  const [pessoas, setPessoas] = useState([])
  const [documentos, setDocumentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Carregar dados iniciais
  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Dados mockados iniciais - em produção, isso seria uma chamada para API
      const initialData = {
        processos: [
          {
            id: 1,
            numero: '001/2023',
            cliente: 'João Silva',
            assunto: 'Divórcio',
            status: 'Ativo',
            advogado: 'Maria Santos',
            data: '2023-01-15',
            descricao: 'Processo de divórcio litigioso',
            valor: 5000.00,
            prazo: '2024-06-15'
          },
          {
            id: 2,
            numero: '002/2023',
            cliente: 'Pedro Oliveira',
            assunto: 'Herança',
            status: 'Arquivado',
            advogado: 'Carlos Lima',
            data: '2022-11-20',
            descricao: 'Inventário e partilha de bens',
            valor: 15000.00,
            prazo: '2023-12-20'
          }
        ],
        atendimentos: [
          {
            id: 1,
            cliente: 'João Silva',
            assunto: 'Consulta jurídica',
            status: 'Pendente',
            data: '2023-10-01',
            descricao: 'Consulta sobre direito de família',
            prioridade: 'Média',
            responsavel: 'Maria Santos'
          },
          {
            id: 2,
            cliente: 'Maria Santos',
            assunto: 'Divórcio',
            status: 'Em Andamento',
            data: '2023-09-28',
            descricao: 'Acompanhamento de processo de divórcio',
            prioridade: 'Alta',
            responsavel: 'Carlos Lima'
          }
        ],
        pessoas: [
          {
            id: 1,
            nome: 'João Silva',
            cpf: '123.456.789-00',
            email: 'joao@email.com',
            telefone: '(11) 99999-9999',
            endereco: 'Rua das Flores, 123',
            tipo: 'Cliente',
            dataNascimento: '1980-05-15'
          },
          {
            id: 2,
            nome: 'Maria Santos',
            cpf: '987.654.321-00',
            email: 'maria@adv.com',
            telefone: '(11) 88888-8888',
            endereco: 'Av. Principal, 456',
            tipo: 'Advogado',
            dataNascimento: '1975-03-20'
          }
        ],
        documentos: [
          {
            id: 1,
            nome: 'Petição Inicial - Processo 001/2023',
            tipo: 'Petição',
            processoId: 1,
            dataUpload: '2023-01-15',
            tamanho: '2.5 MB',
            status: 'Válido'
          },
          {
            id: 2,
            nome: 'Certidão de Casamento',
            tipo: 'Documento',
            processoId: 1,
            dataUpload: '2023-01-16',
            tamanho: '1.2 MB',
            status: 'Válido'
          }
        ]
      }

      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 1000))

      setProcessos(initialData.processos)
      setAtendimentos(initialData.atendimentos)
      setPessoas(initialData.pessoas)
      setDocumentos(initialData.documentos)

    } catch (err) {
      setError('Erro ao carregar dados iniciais')
      console.error('Erro ao carregar dados:', err)
    } finally {
      setLoading(false)
    }
  }

  // Funções CRUD para Processos
  const createProcesso = (novoProcesso) => {
    try {
      const processo = {
        id: Math.max(...processos.map(p => p.id), 0) + 1,
        ...novoProcesso,
        data: new Date().toISOString().split('T')[0]
      }
      setProcessos(prev => [...prev, processo])
      return { success: true, data: processo }
    } catch (error) {
      console.error('Erro ao criar processo:', error)
      return { success: false, error: 'Erro ao criar processo' }
    }
  }

  const updateProcesso = (id, updates) => {
    try {
      const exists = processos.find(p => p.id === id)
      if (!exists) {
        return { success: false, error: 'Processo não encontrado' }
      }

      setProcessos(prev => prev.map(p =>
        p.id === id ? { ...p, ...updates } : p
      ))
      return { success: true }
    } catch (error) {
      console.error('Erro ao atualizar processo:', error)
      return { success: false, error: 'Erro ao atualizar processo' }
    }
  }

  const deleteProcesso = (id) => {
    try {
      const exists = processos.find(p => p.id === id)
      if (!exists) {
        return { success: false, error: 'Processo não encontrado' }
      }

      setProcessos(prev => prev.filter(p => p.id !== id))
      return { success: true }
    } catch (error) {
      console.error('Erro ao excluir processo:', error)
      return { success: false, error: 'Erro ao excluir processo' }
    }
  }

  // Funções CRUD para Atendimentos
  const createAtendimento = (novoAtendimento) => {
    try {
      const atendimento = {
        id: Math.max(...atendimentos.map(a => a.id), 0) + 1,
        ...novoAtendimento,
        data: new Date().toISOString().split('T')[0]
      }
      setAtendimentos(prev => [...prev, atendimento])
      return { success: true, data: atendimento }
    } catch (error) {
      console.error('Erro ao criar atendimento:', error)
      return { success: false, error: 'Erro ao criar atendimento' }
    }
  }

  const updateAtendimento = (id, updates) => {
    try {
      const exists = atendimentos.find(a => a.id === id)
      if (!exists) {
        return { success: false, error: 'Atendimento não encontrado' }
      }

      setAtendimentos(prev => prev.map(a =>
        a.id === id ? { ...a, ...updates } : a
      ))
      return { success: true }
    } catch (error) {
      console.error('Erro ao atualizar atendimento:', error)
      return { success: false, error: 'Erro ao atualizar atendimento' }
    }
  }

  const deleteAtendimento = (id) => {
    try {
      const exists = atendimentos.find(a => a.id === id)
      if (!exists) {
        return { success: false, error: 'Atendimento não encontrado' }
      }

      setAtendimentos(prev => prev.filter(a => a.id !== id))
      return { success: true }
    } catch (error) {
      console.error('Erro ao excluir atendimento:', error)
      return { success: false, error: 'Erro ao excluir atendimento' }
    }
  }

  // Funções CRUD para Pessoas
  const createPessoa = (novaPessoa) => {
    const pessoa = {
      id: Math.max(...pessoas.map(p => p.id), 0) + 1,
      ...novaPessoa
    }
    setPessoas(prev => [...prev, pessoa])
    return pessoa
  }

  const updatePessoa = (id, updates) => {
    setPessoas(prev => prev.map(p =>
      p.id === id ? { ...p, ...updates } : p
    ))
  }

  const deletePessoa = (id) => {
    setPessoas(prev => prev.filter(p => p.id !== id))
  }

  // Funções CRUD para Documentos
  const createDocumento = (novoDocumento) => {
    const documento = {
      id: Math.max(...documentos.map(d => d.id), 0) + 1,
      ...novoDocumento,
      dataUpload: new Date().toISOString().split('T')[0]
    }
    setDocumentos(prev => [...prev, documento])
    return documento
  }

  const updateDocumento = (id, updates) => {
    setDocumentos(prev => prev.map(d =>
      d.id === id ? { ...d, ...updates } : d
    ))
  }

  const deleteDocumento = (id) => {
    setDocumentos(prev => prev.filter(d => d.id !== id))
  }

  const value = {
    // Estados
    processos,
    atendimentos,
    pessoas,
    documentos,
    loading,
    error,

    // Funções CRUD
    createProcesso,
    updateProcesso,
    deleteProcesso,
    createAtendimento,
    updateAtendimento,
    deleteAtendimento,
    createPessoa,
    updatePessoa,
    deletePessoa,
    createDocumento,
    updateDocumento,
    deleteDocumento,

    // Reload
    loadInitialData
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}

