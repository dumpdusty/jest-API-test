import { user } from '../helpers'
import { transactions } from '../helpers'

describe('Transaction', () => {
  afterAll(async () => {
    const response = (await user.getAll()).data
    for (const singleUser of response) {
      await user.remove(singleUser.id)
    }
  })

  test('Create transaction', async () => {
    const amount = 100
    const userFrom = (await user.create()).data.id
    const userTo = (await user.create()).data.id
    const { status, data } = await transactions.create(userFrom, userTo, amount)

    expect(status).toEqual(200)
    // expect(data).toEqual({
    //   id: expect.any(String),
    //   from: `${userFrom}`,
    //   to: `${userTo}`,
    //   amount: amount,
    // })
    expect(data.id).toEqual(expect.any(String))
    expect(data.from).toEqual(`${userFrom}`)
    expect(data.to).toEqual(`${userTo}`)
    expect(data.amount).toEqual(amount)
  })
})
