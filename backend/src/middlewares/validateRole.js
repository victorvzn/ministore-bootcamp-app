import { Prisma } from '../libs/prisma.js'
import { USER_ROLE } from "@prisma/client"

export const validateRole = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Se necesita validar la token",
    })
  }

  const { user } = req

  if (user.tipoUsuario !== USER_ROLE.APP_ADMIN) {
    return res.status(401).json({
      message: "Usuario no cuenta con privilegios para realizar esta accion",
    })
  }

  next()
}