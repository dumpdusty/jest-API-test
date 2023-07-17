import { user } from '../helpers'

describe('User', () => {
  afterAll(async () => {
    const response = (await user.getAll()).data
    for (const singleUser of response) {
      await user.remove(singleUser.id)
    }
  })

  test('Create user', async () => {
    const { status, data } = await user.create()

    expect(status).toEqual(200)
    expect(data.id).toEqual(expect.any(String))
    expect(data.amount).toEqual(expect.any(Number))
  })

  test('Get user by Id', async () => {
    const userId = (await user.create()).data.id
    const { status, data } = await user.getSingle(userId)

    expect(status).toEqual(200)
    expect(data.id).toEqual(userId)
    expect(data.amount).toEqual(expect.any(Number))
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
    let response = await user.remove(userId)
    expect(response.status).toEqual(200)
    expect(response.data.message).toEqual('User deleted.')

    // check if user actually deleted
    response = await user.getSingle(userId)
    expect(response.status).toEqual(400)
    expect(response.data.message).toEqual('No user found.')
  })

  test('Delete non-Existing User', async () => {
    let response = await user.remove('invalid')
    expect(response.status).toEqual(400)
    expect(response.data.message).toEqual('No user found.')
  })
})
