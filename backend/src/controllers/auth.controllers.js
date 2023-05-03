import { Prisma } from "../libs/prisma.js"

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const authLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await Prisma.user.findUnique({ where: { email } })

    if (!userFound) {
      throw new Error('User is not exist')
    }

    const isVerifiedPassword = bcrypt.compareSync(password, userFound.password)

    if (isVerifiedPassword) {
      const payload = {
        jti: userFound.id,
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        role: userFound.role
      }
      const secretKey = process.env.JWT_SECRET
      const options = { expiresIn: '1h' }

      const token = jwt.sign(payload, secretKey, options)

      return res.json({ token })
    } else {
      throw new Error('Incorrect credentials')
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al autenticar al usuario', content: error.message })
  }
}