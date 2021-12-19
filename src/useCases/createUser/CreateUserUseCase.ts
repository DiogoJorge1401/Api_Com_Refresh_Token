import { client } from '../../prisma/client'
import { hash } from 'bcryptjs'
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken'

interface User {
  name: string
  username: string
  password: string
}

export class CreateUserUseCase {
  async execute({ name, password, username }: User) {
    const userExists = await client.users.findFirst({ where: { username } })

    if (userExists) throw new Error('User alredy exits!')

    const passwordHash = await hash(password, 8)

    const user = await client.users.create({
      data: {
        name,
        password: passwordHash,
        username,
      },
    })

    const generateRefreshToken = new GenerateRefreshToken()

    const refreshToken = await generateRefreshToken.execute(user.id)

    return { user, refreshToken }
  }
}
