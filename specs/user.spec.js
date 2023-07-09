import { signIn, user } from '../helpers'

describe('User', () => {
  // uncomment beforeALL hook if the User spec failing after Auth spec
  // alternate way - rerun server

  beforeAll(async () => {
    const response = await signIn(process.env.LOGIN, process.env.PASSWORD)
    process.env.TOKEN = response.data.token
  })

  test('Create user', async () => {
    const response = await user.create()

    expect(response.status).toEqual(200)
    expect(response.data).toEqual({
      id: expect.any(String),
      amount: expect.any(Number),
    })
  })

  test('Get user by Id', async () => {
    const userId = (await user.create()).data.id
    const response = await user.getSingle(userId)

    expect(response.status).toEqual(200)
    expect(response.data.id).toEqual(userId)
  })

  test('Get all users', async () => {
    await user.create()
    const response = await user.getAll()

    expect(response.status).toEqual(200)
    expect(Array.isArray(response.data)).toBe(true)
  })

  test('Delete User', async () => {
    const userId = (await user.create()).data.id
    const response = await user.remove(userId)

    expect(response.status).toEqual(200)
    expect(response.data.message).toEqual('User deleted.')
  })
})
