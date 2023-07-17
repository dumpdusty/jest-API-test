import { request } from '../../common'

export const create = async (from, to, amount) => {
  return request.post(
    '/transactions',
    { from, to, amount },
    {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` },
    }
  )
}
