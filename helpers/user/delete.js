import { request } from '../../common'

export const remove = async userId => {
  return request.delete(`/users`, {
    data: { id: userId },
    headers: { Authorization: `Bearer ${process.env.TOKEN}` },
  })
}
