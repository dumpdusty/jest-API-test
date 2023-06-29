import { request } from 'common'

describe('Authorization & Authentication', () => {
  test('Sign in with valid credentials', async () => {
    const response = await request.post('/auth', {
      login: process.env.LOGIN,
      password: process.env.PASSWORD,
    })
    expect(response.status).toEqual(200)
    expect(response.data).toEqual({ token: expect.any(String) })
  })

  it('Sign in with invalid login', async () => {
    const response = await request.post('/auth', {
      login: 'adminius1',
      password: 'supers3cret',
    })
    expect(response.status).toEqual(404)
    expect(response.data).toEqual({ message: 'Wrong login or password.' })
  })

  it('Sign in without data', async () => {
    const response = await request.post('/auth', {})
    expect(response.status).toEqual(400)
    expect(response.data).toEqual({ message: 'No credentials provided.' })
  })
})
