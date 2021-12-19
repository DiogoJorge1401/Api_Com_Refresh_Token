import { client } from '../../prisma/client'
import { compare } from 'bcryptjs'
import { GenerateRefreshToken } from '../../provider/GenerateRefreshToken'

interface UserRequest {
  username: string
  password: string
}

export class AuthenticateUserUseCase {
  async execute({ password, username }: UserRequest) {
    const userExists = await client.users.findFirst({
      where: {
        username,
      },
    })

    if (!userExists) throw new Error('User or password incorrect!')

    const passwordMatch = await compare(password, userExists.password)

    if (!passwordMatch) throw new Error('User or password incorrect!')

    const generateRefreshToken = new GenerateRefreshToken()

    return await generateRefreshToken.execute(userExists.id)
  }
}
