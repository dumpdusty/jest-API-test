import { user } from '../helpers'
import { transactions } from '../helpers'

describe('Transaction positive tests', () => {
  const amount = 100
  let transactionList = []
  let userList = []

  afterAll(async () => {
    for (const singleTrans of transactionList) {
      await transactions.remove(singleTrans)
    }

    for (const singleUser of userList) {
      await user.remove(singleUser)
    }
  })

  test('Create transaction', async () => {
    const userFrom = (await user.create()).data.id
    userList.push(userFrom)
    const userTo = (await user.create()).data.id
    userList.push(userTo)

    const { status, data } = await transactions.create(userFrom, userTo)
    transactionList.push(data.id)

    expect(status).toEqual(200)
    expect(data.id).toEqual(expect.any(String))
    expect(data.from).toEqual(`${userFrom}`)
    expect(data.to).toEqual(`${userTo}`)
    expect(data.amount).toEqual(amount)

    const getUserFromResponse = await user.getSingle(userFrom)
    expect(getUserFromResponse.data.amount).toEqual(
      +process.env.INITIAL_AMOUNT - amount
    )

    const getUserToResponse = await user.getSingle(userTo)
    expect(getUserToResponse.data.amount).toEqual(
      +process.env.INITIAL_AMOUNT + amount
    )
  })

  test('Get all transactions', async () => {
    const userFrom = (await user.create()).data.id
    userList.push(userFrom)
    const userTo = (await user.create()).data.id
    userList.push(userTo)

    for (let i = 0; i < 3; i++) {
      let transaction = await transactions.create(userFrom, userTo)
      transactionList.push(transaction.data.id)
    }

    const { status, data } = await transactions.getAll()
    transactionList.push(data.id)

    expect(status).toEqual(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
  })

  test('Get single transaction', async () => {
    const userFrom = (await user.create()).data.id
    userList.push(userFrom)
    const userTo = (await user.create()).data.id
    userList.push(userTo)
    const transaction = await transactions.create(userFrom, userTo)
    transactionList.push(transaction.data.id)
    const { status, data } = await transactions.getSingle(transaction.data.id)

    expect(status).toEqual(200)
    expect(data.id).toEqual(`${transaction.data.id}`)
  })

  test('Delete transaction', async () => {
    const userFrom = (await user.create()).data.id
    userList.push(userFrom)
    const userTo = (await user.create()).data.id
    userList.push(userTo)
    const transaction = await transactions.create(userFrom, userTo)

    const { status, data } = await transactions.remove(transaction.data.id)

    expect(status).toEqual(200)
    expect(data.message).toEqual('Transaction reverted.')
  })
})

describe('Transaction negative tests', () => {
  const amount = 100
  afterAll(async () => {
    const response = (await user.getAll()).data
    for (const singleUser of response) {
      await user.remove(singleUser.id)
    }
  })
  test('Create transaction with invalid sender id', async () => {
    const userTo = (await user.create()).data.id
    const { status, data } = await transactions.create(
      'invalid',
      userTo,
      amount
    )

    expect(status).toEqual(400)
    expect(data.message).toEqual('Sender not found.')
  })
  test('Create transaction with invalid receiver id', async () => {
    const userFrom = (await user.create()).data.id
    const { status, data } = await transactions.create(
      userFrom,
      'invalid',
      amount
    )

    expect(status).toEqual(400)
    expect(data.message).toEqual('Receiver not found.')
  })
  test('Create transaction with invalid amount', async () => {
    const userFrom = (await user.create()).data.id
    const userTo = (await user.create()).data.id
    const { status, data } = await transactions.create(userFrom, userTo, 1500)

    expect(status).toEqual(400)
    expect(data.message).toEqual('Sender does not have enough money.')
  })
})
