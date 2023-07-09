import { request } from '../../common'

export const create = async () => {
  return request.post('/users', null, {
    headers: { Authorization: `Bearer ${process.env.TOKEN}` },
  })

  // another way to create axios requests (more complicated imho)
  // const config = {
  //   method: 'post',
  //   url: '/users',
  //   headers: {
  //     Authorization: `Bearer ${process.env.TOKEN}`,
  //   },
  // }
  // return request.request(config)
}
