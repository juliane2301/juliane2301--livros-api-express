import { useState, useEffect } from 'react'
import api from '../services/api'

function FormLivro({ livroEditando, onSalvar, onCancelar }) {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [ano, setAno] = useState('')
  const [genero, setGenero] = useState('')

  useEffect(() => {
    if (livroEditando) {
      setTitulo(livroEditando.titulo)
      setAutor(livroEditando.autor)
      setAno(livroEditando.ano)
      setGenero(livroEditando.genero)
    } else {
      setTitulo('')
      setAutor('')
      setAno('')
      setGenero('')
    }
  }, [livroEditando])

  async function handleSubmit(e) {
    e.preventDefault()
    const livro = { titulo, autor, ano: Number(ano), genero }

    try {
      if (livroEditando) {
        await api.put(`/livros/${livroEditando.id}`, livro)
      } else {
        await api.post('/livros', livro)
      }
      onSalvar()
      setTitulo('')
      setAutor('')
      setAno('')
      setGenero('')
    } catch (error) {
      alert('Erro ao salvar livro!')
    }
  }

  return (
    <div className="card">
      <h2>{livroEditando ? 'Editar Livro' : 'Cadastrar Livro'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
      <input
  type="text"
  placeholder="Ano (ex: 1997)"
  value={ano}
  onChange={(e) => setAno(e.target.value)}
  required
/>
        <input
          type="text"
          placeholder="Gênero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary">
          {livroEditando ? 'Salvar Edição' : 'Cadastrar'}
        </button>
        {livroEditando && (
          <button type="button" className="btn-danger" onClick={onCancelar}>
            Cancelar
          </button>
        )}
      </form>
    </div>
  )
}

export default FormLivro
