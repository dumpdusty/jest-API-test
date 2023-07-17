import { user } from '../helpers'

describe('User', () => {
  afterAll(async () => {
    const response = (await user.getAll()).data
    for (const singleUser of response) {
      await user.remove(singleUser.id)
    }
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
    expect(response.data.amount).toEqual(expect.any(Number))
  })

  test('Get all users', async () => {
    await user.create()
    const response = await user.getAll()

    expect(response.status).toEqual(200)
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data.length).toBeGreaterThan(0)

    for await (const user of response.data) {
      expect(user).toEqual({
        id: expect.any(String),
        amount: expect.any(Number),
      })
    }
  })

  test('Delete User', async () => {
    const userId = (await user.create()).data.id
    const response = await user.remove(userId)

    expect(response.status).toEqual(200)
    expect(response.data.message).toEqual('User deleted.')
  })
})
