import { http, HttpResponse } from 'msw'
import { users } from '../data'

export const authHandlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const { username, password } = await request.json()
    const user = users.find(u => u.username === username && u.password === password)

    if (!user) {
      return HttpResponse.json({ message: '帳號或密碼錯誤' }, { status: 401 })
    }

    const { password: _, ...safeUser } = user
    return HttpResponse.json({ user: safeUser, token: 'mock-token' }, { status: 200 })
  }),
]
