import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
export const ensuseAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization
  if (!authToken) {
    return res.status(401).json({
      message: 'Token is missing',
    })
  }
  const [, token] = authToken.split(' ')
  try {
    verify(token, '1b4e2266a6ed5a2c6a2fe02c32a32e13')
    return next()
  } catch (err) {
    return res.status(401).json({
      message: 'Invalid token!',
    })
  }
}
