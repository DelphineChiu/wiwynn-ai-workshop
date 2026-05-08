import { http, HttpResponse } from 'msw'
import { vehicles, getNextVehicleId } from '../data'

export const vehicleHandlers = [
  http.get('/api/vehicles', () => {
    return HttpResponse.json(vehicles)
  }),

  http.post('/api/vehicles', async ({ request }) => {
    const body = await request.json()
    const newVehicle = { id: getNextVehicleId(), ...body }
    vehicles.push(newVehicle)
    return HttpResponse.json(newVehicle, { status: 201 })
  }),

  http.put('/api/vehicles/:id', async ({ params, request }) => {
    const id = Number(params.id)
    const body = await request.json()
    const idx = vehicles.findIndex(v => v.id === id)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    vehicles[idx] = { ...vehicles[idx], ...body }
    return HttpResponse.json(vehicles[idx])
  }),

  http.delete('/api/vehicles/:id', ({ params }) => {
    const id = Number(params.id)
    const idx = vehicles.findIndex(v => v.id === id)
    if (idx === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 })
    vehicles.splice(idx, 1)
    return new HttpResponse(null, { status: 204 })
  }),
]
