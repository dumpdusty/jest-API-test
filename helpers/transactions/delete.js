import { request } from '../../common'

export const remove = async transactionId => {
  return request.delete(`/transactions`, {
    data: { id: transactionId },
    headers: { Authorization: `Bearer ${process.env.TOKEN}` },
  })
}