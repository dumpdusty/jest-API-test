import { request } from '../../common'

export const cleanUp = async () => {
  return request.delete('/config', {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` },
  })
}