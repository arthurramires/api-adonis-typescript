import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import {hash} from 'bcrypt'
export default class UsersController {
  public async store ({ request, response }: HttpContextContract) {
    const data = request.only(['username', 'email', 'password'])

    const userExists = await User.findBy('email', data.email)

    if (userExists) {
      return response
        .send({ message: { error: 'User already registered' } })
    }
    data.password = await hash(data.password, 8)

    const user = await User.create(data)

    return user
  }
}
