import { Database } from './database.js'
import { randomUUID } from 'node:crypto'
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {

      const tasks = [
        {
          id: randomUUID(),
          title: 'Task 1',
          description: 'Description of Task 1',
        }
      ]


      return res.end(JSON.stringify(database.select('tasks')))
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {

      const { title, description } = req.body
      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,      // Começa como não concluída
      created_at: new Date(),   // Data e hora do momento da criação
      updated_at: new Date(),
      } 
      database.insert('tasks', task)
      return res.writeHead(201).end()
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      const [task] = database.select('tasks', { id })

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({ message: 'Task não encontrada' }))
      }

      database.update('tasks', id, {
        title: title ?? task.title,
        description: description ?? task.description,
        updated_at: new Date()
      })

      return res.writeHead(204).end() 
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params
      database.delete('tasks', id)
      return res.writeHead(204).end() 
    },
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params
      const [task] = database.select('tasks', { id })
      if (!task) {
        return res.writeHead(404).end()
      }
      const isTaskCompleted = !!task.completed_at
      const completed_at = isTaskCompleted ? null : new Date()

      database.patch('tasks', id, {
        completed_at,
        updated_at: new Date()
      })
      return res.writeHead(204).end()
    }
  }
]