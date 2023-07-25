import { config } from '../helpers'
import { user, transactions } from '../helpers'

describe('Config positive tests', () => {
  // wipe out config after each test
  afterEach(async () => {
    await config.cleanUp()
  })

  test('Get config', async () => {
    const getConfigResponse = await config.getConfig()

    expect(getConfigResponse.status).toEqual(200)
    expect(getConfigResponse.data).toEqual({
      number_of_entries: expect.any(Number),
      initial_amount: expect.any(Number),
    })
  })

  test('Update config', async () => {
    // verify getConfig response before update
    const configGetBeforeUpdate = await config.getConfig()

    expect(configGetBeforeUpdate.data.number_of_entries).toEqual(25)
    expect(configGetBeforeUpdate.data.initial_amount).toEqual(1000)

    // verify updateConfig response
    const updateConfigResponse = await config.updateConfig(20, 500)

    expect(updateConfigResponse.status).toEqual(200)
    expect(updateConfigResponse.data.number_of_entries).toEqual(20)
    expect(updateConfigResponse.data.initial_amount).toEqual(500)

    // verify getConfig response after update
    const configGetAfterResponse = await config.getConfig()
    expect(configGetAfterResponse.data.number_of_entries).toEqual(20)
    expect(configGetAfterResponse.data.initial_amount).toEqual(500)
  })

  test('Delete config', async () => {
    // verify getConfig response before update
    const configGetBeforeUpdateResponse = await config.getConfig()

    expect(configGetBeforeUpdateResponse.data.number_of_entries).toEqual(25)
    expect(configGetBeforeUpdateResponse.data.initial_amount).toEqual(1000)

    // verify updateConfig response
    const updateConfigResponse = await config.updateConfig(20, 500)

    expect(updateConfigResponse.status).toEqual(200)
    expect(updateConfigResponse.data.number_of_entries).toEqual(20)
    expect(updateConfigResponse.data.initial_amount).toEqual(500)

    // verify getConfig after update response
    const configGetAfterUpdate = await config.getConfig()
    expect(configGetAfterUpdate.data.number_of_entries).toEqual(20)
    expect(configGetAfterUpdate.data.initial_amount).toEqual(500)

    // verify deleteConfig response
    const deleteConfigResponse = await config.cleanUp()

    expect(deleteConfigResponse.status).toEqual(200)
    expect(deleteConfigResponse.data.message).toEqual('Data wiped out.')

    // verify config back to default after wiped out
    const configGetAfterDelete = await config.getConfig()
    expect(configGetAfterDelete.data.number_of_entries).toEqual(25)
    expect(configGetAfterDelete.data.initial_amount).toEqual(1000)
  })

  test.skip('verify users and transactions deleted after config wipe out', async () => {
    const userFrom = await user.create()
    const userTo = await user.create()
    await transactions.create(userFrom.data.id, userTo.data.id)

    // verify users and transaction created
    expect((await user.getAll()).data).toHaveLength(2)
    expect((await transactions.getAll()).data).toHaveLength(1)

    await config.cleanUp()

    //verify users and transaction deleted
    expect((await user.getAll()).data).toHaveLength(0)
    expect((await transactions.getAll()).data).toHaveLength(0)
  })
})

describe.skip('Config negative tests', () => {
  // wipe out config after each test
  afterEach(async () => {
    await config.cleanUp()
  })

  test('Update to minimum entries', async () => {
    let usersIdList = []
    // verify config updated
    const updateResponse = await config.updateConfig(5)
    expect(updateResponse.status).toEqual(200)
    expect(updateResponse.data.number_of_entries).toEqual(5)

    // create users
    for (let i = 0; i < 5; i++) {
      usersIdList.push((await user.create()).data.id)
    }

    // verify maximum quantity of users created
    const failedUserCreateResponse = await user.create()
    expect(failedUserCreateResponse.status).toEqual(400)
    expect(failedUserCreateResponse.data.message).toEqual(
      'Maximum number of users reached.'
    )

    // create transactions
    for (let i = 0; i < 5; i++) {
      await transactions.create(usersIdList[0], usersIdList[1])
    }

    // verify maximum quantity of transactions created
    const failedTransactionCreateResponse = await transactions.create(
      usersIdList[0],
      usersIdList[1]
    )
    expect(failedTransactionCreateResponse.status).toEqual(400)
    expect(failedTransactionCreateResponse.data.message).toEqual(
      'Maximum number of transactions reached.'
    )
  })
})
