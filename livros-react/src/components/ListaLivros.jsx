import api from '../services/api'

function ListaLivros({ livros, onExcluir, onEditar }) {
  async function handleExcluir(id) {
    if (!confirm('Deseja excluir este livro?')) return
    try {
      await api.delete(`/livros/${id}`)
      onExcluir()
    } catch (error) {
      alert('Erro ao excluir livro!')
    }
  }

  return (
    <div className="card">
      <h2>Lista de Livros</h2>
      {livros.length === 0 ? (
        <p>Nenhum livro encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>Ano</th>
              <th>Gênero</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <tr key={livro.id}>
                <td>{livro.titulo}</td>
                <td>{livro.autor}</td>
                <td>{livro.ano}</td>
                <td>{livro.genero}</td>
                <td>
                  <button className="btn-warning" onClick={() => onEditar(livro)}>
                    Editar
                  </button>
                  <button className="btn-danger" onClick={() => handleExcluir(livro.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ListaLivros
