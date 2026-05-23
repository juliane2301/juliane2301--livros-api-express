const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

let livros = [
  { id: 1, titulo: 'O Senhor dos Aneis', autor: 'J.R.R. Tolkien', ano: 1954, genero: 'Fantasia' },
  { id: 2, titulo: 'Dom Casmurro', autor: 'Machado de Assis', ano: 1899, genero: 'Romance' },
  { id: 3, titulo: '1984', autor: 'George Orwell', ano: 1949, genero: 'Ficcao Cientifica' },
]

let proximoId = 4

app.get('/livros', (req, res) => {
  const { genero } = req.query
  let resultado = livros
  if (genero) resultado = livros.filter(l => l.genero.toLowerCase().includes(genero.toLowerCase()))
  res.json(resultado)
})

app.post('/livros', (req, res) => {
  const novoLivro = { id: proximoId++, ...req.body }
  livros.push(novoLivro)
  res.status(201).json(novoLivro)
})

app.put('/livros/:id', (req, res) => {
  const index = livros.findIndex(l => l.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ erro: 'nao encontrado' })
  livros[index] = { id: Number(req.params.id), ...req.body }
  res.json(livros[index])
})

app.delete('/livros/:id', (req, res) => {
  const index = livros.findIndex(l => l.id === Number(req.params.id))
  if (index === -1) return res.status(404).json({ erro: 'nao encontrado' })
  livros.splice(index, 1)
  res.status(204).send()
})

app.listen(3000, () => console.log('API rodando em http://localhost:3000'))