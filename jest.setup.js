import 'dotenv/config'
import { signIn } from './helpers'

module.export = async () => {
  const response = await signIn(process.env.LOGIN, process.env.PASSWORD)
  process.env.TOKEN = response.data.token
}
