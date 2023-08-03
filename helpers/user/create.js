import { client, request } from '../../common'

export const create = async () => {
  return request.post('/users', null, {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` },
  })
}

export const createClient = async () => {
  return client().post('/users')
}

// another way to create axios requests
export const createUser = () => {
  const config = {
    method: 'post',
    url: '/users',
  }

  return client().request(config)
}
