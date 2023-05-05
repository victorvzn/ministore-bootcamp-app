import jwt from 'jsonwebtoken'
import { Prisma } from "../libs/prisma.js"

export const validateToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Se necesita un token para realizar esta peticion' })
  }

  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'El formato debe ser: Bearer YOUR_TOKEN' })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // TODO: Mejorar la forma de traer el membership de un usuario

    const userFound = await Prisma.user.findFirst({ where: { id: payload.jti } })

    const userEnterpriseFound = await Prisma.membership.findFirst({ where: { userId: userFound.id } })

    if (!userEnterpriseFound) {
      return res.status(400).json({ code: 'T001', message: 'Error' })
    }

    req.user = {
      ...userFound,
      enterprise: {
        id: userEnterpriseFound.enterpriseId,
        role: userEnterpriseFound.role
      }
    }

    next()
  } catch (error) {
    // si la token es incorrecta ingresara al catch y/o si el usuario no existe
    return res.status(400).json({
      code: 'T002',
      message: 'Error',
      content: error.message
    })
  }
}