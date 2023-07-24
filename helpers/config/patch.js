import { request } from '../../common'

export const updateConfig = async (
  number_of_entries = null,
  initial_amount = null
) => {
  return request.patch(
    '/config',
    {
      number_of_entries,
      initial_amount,
    },
    {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    }
  )
}
