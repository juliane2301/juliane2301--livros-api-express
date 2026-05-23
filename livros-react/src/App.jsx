import { useState, useEffect } from 'react'
import api from './services/api'
import FormLivro from './components/FormLivro'
import ListaLivros from './components/ListaLivros'

function App() {
  const [livros, setLivros] = useState([])
  const [livroEditando, setLivroEditando] = useState(null)
  const [generoFiltro, setGeneroFiltro] = useState(
    () => localStorage.getItem('generoFiltro') || ''
  )

  async function buscarLivros(genero) {
    try {
      const url = genero ? `/livros?genero=${genero}` : '/livros'
      const response = await api.get(url)
      setLivros(response.data)
    } catch (error) {
      alert('Erro ao buscar livros!')
    }
  }

  useEffect(() => {
    buscarLivros(generoFiltro)
  }, [])

  function handleFiltroChange(e) {
    const valor = e.target.value
    setGeneroFiltro(valor)
    localStorage.setItem('generoFiltro', valor)
  }

  function handleFiltrar() {
    buscarLivros(generoFiltro)
  }

  function handleLimparFiltro() {
    setGeneroFiltro('')
    localStorage.removeItem('generoFiltro')
    buscarLivros('')
  }

  return (
    <>
      <h1>Acervo de Livros</h1>
      <div className="container">
        <FormLivro
          livroEditando={livroEditando}
          onSalvar={() => {
            setLivroEditando(null)
            buscarLivros(generoFiltro)
          }}
          onCancelar={() => setLivroEditando(null)}
        />

        <div className="card">
          <h2>Filtrar por Gênero</h2>
          <div className="filtro">
            <input
              type="text"
              placeholder="Digite o gênero..."
              value={generoFiltro}
              onChange={handleFiltroChange}
            />
            <button className="btn-primary" onClick={handleFiltrar}>
              Filtrar
            </button>
            <button className="btn-danger" onClick={handleLimparFiltro}>
              Limpar
            </button>
          </div>
        </div>

        <ListaLivros
          livros={livros}
          onExcluir={() => buscarLivros(generoFiltro)}
          onEditar={(livro) => setLivroEditando(livro)}
        />
      </div>
    </>
  )
}

export default App
