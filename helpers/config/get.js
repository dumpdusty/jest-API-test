import { request } from '../../common'

export const getConfig = async () => {
  return request.get('/config', {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` },
  })
}
