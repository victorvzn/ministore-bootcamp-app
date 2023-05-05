import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcryptjs'
import { addDays } from 'date-fns'

const prisma = new PrismaClient()

const PLAN_FREE = 'Free'

const passwordHashed = bcrypt.hashSync('Welcome123', 10);

export const enterprise = {
  name: 'tienda2',
  domain: 'localhost:3001'
}

export const users = [
  {
    firstname: 'Admin1',
    lastname: 'Tienda2',
    phoneNumber: '999888555',
    address: 'Con dirección 222',
    email: 'admin1@tienda2.co',
    password: passwordHashed,
    role: 'ENTERPRISE_ADMIN',
    emailVerified: true,
    membership: {
      role: 'OWNER',
    }
  }
 ]

export const generateTienda2Empty = async () => {
  const getPlanFree = await prisma.plan.findFirst({ where: { name: PLAN_FREE } })

  const planId = getPlanFree.id
  const trialDuration = getPlanFree.duration
  
  const currentDate = new Date()
  const addTrialDurationToCurrentDate = addDays(currentDate, trialDuration);

  const newEnterprise = await prisma.enterprise.create({ data: enterprise })
  const enterpriseId = newEnterprise.id

  // newSubscription
  await prisma.subscription.create({
    data: {
      trialStart: currentDate,
      trialEnd: addTrialDurationToCurrentDate,
      planId,
      trialDuration,
      enterpriseId
    }
  })

  for (let data of users) {
    const { membership, ...user } = data

    const newUser = await prisma.user.create({ data: user })
    const userId = newUser.id

    // newMemberships
    await prisma.membership.create({
      data: {
        role: membership.role,
        enterpriseId,
        userId
      }
    })
  }

  console.log('Seeding Tienda2: OK')
}

