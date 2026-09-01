import fs from 'node:fs'
import { parse } from 'csv-parse'

// Localiza o caminho do arquivo csv
const csvPath = new URL('./tasks.csv', import.meta.url)
// Cria uma stream de leitura do arquivo CSV
const stream = fs.createReadStream(csvPath)

// Configura o parser do CSV
const csvParse = parse({
  delimiter: ',',
  skip_empty_lines: true,
  from_line: 2 // Pula a primeira linha (cabeçalho: title, description)
})

async function run() {
  const linesParse = stream.pipe(csvParse)
  console.log('inciando importação de tarefas...')

  for await (const line of linesParse) {
    const [title, description] = line
    // Envia cada linha do CSV como um POST para a API
    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })
    console.log(`Tarefa criada: "${title}"`)
  }
  console.log('Importação concluída com sucesso!')
}
run()