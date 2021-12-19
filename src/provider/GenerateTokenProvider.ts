import { sign } from 'jsonwebtoken'

export const generateTokenPovider = (userId:string) => {
  return sign({}, '1b4e2266a6ed5a2c6a2fe02c32a32e13', {
    subject: userId,
    expiresIn: '20s',
  })
}
