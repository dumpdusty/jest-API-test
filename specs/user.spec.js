import { user } from '../helpers'

describe('User', () => {
  let userList = []
  let singleUser

  beforeEach(async () => {
    singleUser = await user.create()
    userList.push(singleUser.data.id)
  })
  afterAll(async () => {
    for (const el of userList) {
      await user.remove(el)
    }
  })

  test('Create user', async () => {
    expect(singleUser.status).toEqual(200)
    expect(singleUser.data.id).toEqual(expect.any(String))
    expect(singleUser.data.amount).toEqual(expect.any(Number))
  })

  test('Get user by Id', async () => {
    const { status, data } = await user.getSingle(singleUser.data.id)

    expect(status).toEqual(200)
    expect(data.id).toEqual(singleUser.data.id)
    expect(data.amount).toEqual(expect.any(Number))
  })

  test('Get all users', async () => {
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
    let response = await user.remove(singleUser.data.id)
    expect(response.status).toEqual(200)
    expect(response.data.message).toEqual('User deleted.')

    // check if user actually deleted
    response = await user.getSingle(singleUser.data.id)
    expect(response.status).toEqual(400)
    expect(response.data.message).toEqual('No user found.')
  })

  test('Delete non-Existing User', async () => {
    let response = await user.remove('invalid')
    expect(response.status).toEqual(400)
    expect(response.data.message).toEqual('No user found.')
  })
})
