import { signIn } from '../helpers'

describe('Authorization & Authentication', () => {
  test('Sign in with valid credentials', async () => {
    const response = await signIn(process.env.LOGIN, process.env.PASSWORD)

    expect(response.status).toEqual(200)
    expect(response.data).toEqual({ token: expect.any(String) })
  })

  it('Sign in with invalid login', async () => {
    const response = await signIn('testLogin', process.env.PASSWORD)

    expect(response.status).toEqual(404)
    expect(response.data).toEqual({ message: 'Wrong login or password.' })
  })

  it('Sign in without data', async () => {
    const response = await signIn()

    expect(response.status).toEqual(400)
    expect(response.data).toEqual({ message: 'No credentials provided.' })
  })
})
