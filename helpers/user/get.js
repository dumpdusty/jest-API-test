import { request } from '../../common'

export const getSingle = async userId => {
  return request.get(`/users?id=${userId}`, {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` },
  })
}
export const getAll = async () => {
  return request.get(`/users`, {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` },
  })
}
