import { config } from '../helpers'
// import { user, transactions } from '../helpers'

describe('Config', () => {
  // wipe out config after each test
  afterEach(async () => {
    await config.cleanUp()
  })

  test('Get config', async () => {
    const { status, data } = await config.getConfig()

    expect(status).toEqual(200)
    expect(data).toEqual({
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
})
