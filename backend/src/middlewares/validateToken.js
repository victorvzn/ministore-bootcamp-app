import jwt from 'jsonwebtoken'
import { Prisma } from "../libs/prisma.js"

export const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Se necesita una token para realizar esta peticion' })
  }

  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'El formato debe ser Bearer YOUR_TOKEN' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    const useFound = await Prisma.user.findFirst({ where: { id: payload.jti } })

    console.log({ useFound })

    req.user = useFound

    next()
  } catch (error) {
    // si la token es incorrecta ingresara al catch y/o si el usuario no existe
    return res.status(400).json({
      message: 'Error',
      content: error.message
    })
  }
}