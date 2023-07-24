import { request } from '../../common'

export const create = async (from, to, amount = +process.env.TEST_AMOUNT) => {
  return request.post(
    '/transactions',
    { from, to, amount },
    {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    }
  )
}
