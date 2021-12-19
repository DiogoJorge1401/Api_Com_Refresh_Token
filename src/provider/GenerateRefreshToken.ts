import { client } from '../prisma/client'
import dayjs from 'dayjs'
import { generateTokenPovider } from './GenerateTokenProvider'

export class GenerateRefreshToken {
  async execute(userId: string) {
    const tokenExists = await client.refreshToken.findFirst({
      where: {
        usersId: userId,
      },
    })

    const expiresIn = dayjs().add(20, 'second').unix()
    const token = generateTokenPovider(userId)

    if (tokenExists) {
      if (tokenExists.expiresIn < dayjs().unix()) {
        const tokenUpdate = await client.refreshToken.update({
          data: {
            expiresIn,
            token,
          },
          where: {
            id: tokenExists.id,
          },
        })
        return { refreshToken: tokenUpdate }
      }
      return { refreshToken: tokenExists }
    }

    const refreshToken = await client.refreshToken.create({
      data: {
        expiresIn: expiresIn,
        usersId: userId,
        token,
      },
    })

    return { refreshToken }
  }
}
