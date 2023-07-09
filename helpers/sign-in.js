import { request } from '../common'

export const signIn = async (login, password) => {
  return request.post('/auth', {
    login,
    password,
  })
}
