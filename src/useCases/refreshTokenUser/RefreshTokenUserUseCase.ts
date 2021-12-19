import dayjs from 'dayjs'
import { client } from '../../prisma/client'
import { generateTokenPovider } from '../../provider/GenerateTokenProvider'

export class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    })

    if (!refreshToken) throw new Error('Invalid refresh token!')

    const expiresIn = dayjs().add(20, 'second').unix()
    const token = generateTokenPovider(refreshToken.usersId)

    const updatedToken = await client.refreshToken.update({
      data: {
        expiresIn,
        token,
      },
      where: {
        id: refreshToken.id,
      },
    })

    return { refreshToken: updatedToken }
  }
}
