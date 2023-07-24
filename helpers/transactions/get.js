import { request } from '../../common'

export const getSingle = async transactionId => {
  return request.get(`/transactions?id=${transactionId}`, {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` },
  })
}
export const getAll = async () => {
  return request.get(`/transactions`, {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` },
  })
}
