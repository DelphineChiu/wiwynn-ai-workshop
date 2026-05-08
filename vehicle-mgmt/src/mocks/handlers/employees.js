import { http, HttpResponse } from 'msw'
import { employees, getNextEmployeeId } from '../data'

export const employeeHandlers = [
  http.get('/api/employees', () => {
    return HttpResponse.json(employees)
  }),

  http.post('/api/employees', async ({ request }) => {
    const body = await request.json()
    const newEmployee = { id: getNextEmployeeId(), ...body }
    employees.push(newEmployee)
    return HttpResponse.json(newEmployee, { status: 201 })
  }),

  http.put('/api/employees/:id', async ({ params, request }) => {
    const id = Number(params.id)
    const body = await request.json()
    const idx = employees.findIndex(e => e.id === id)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    employees[idx] = { ...employees[idx], ...body }
    return HttpResponse.json(employees[idx])
  }),

  http.delete('/api/employees/:id', ({ params }) => {
    const id = Number(params.id)
    const idx = employees.findIndex(e => e.id === id)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    employees.splice(idx, 1)
    return new HttpResponse(null, { status: 204 })
  }),
]
