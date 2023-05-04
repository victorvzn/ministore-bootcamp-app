import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const passwordHashed = (password) => bcrypt.hashSync(password, 10);

export const users = [
  {
    firstname: 'Super',
    lastname: 'Admin',
    phoneNumber: '988259798',
    email: 'superadmin@ministore.test',
    password: passwordHashed('Welcome123'),
    role: 'APP_ADMIN',
    emailVerified: true
  }
]

export const generateUsers = async () => {
  for (let data of users) {
    await prisma.user.create({ data })
  }

  console.log('Seeding users by default: OK')
}