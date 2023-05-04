import { PrismaClient } from '@prisma/client'

import bcrypt from 'bcryptjs'
import { addDays } from 'date-fns'

const prisma = new PrismaClient()

const DEFAULT_TRIAL_DURATION = 7
const PLAN_FREE = 'Free'

const passwordHashed = bcrypt.hashSync('Welcome123', 10);

export const enterprise = {
  name: 'tienda1',
  domain: 'localhost:3000'
}

export const users = [
  {
    firstname: 'Admin1',
    lastname: 'Tienda1',
    phoneNumber: '999888111',
    address: 'Con dirección 111',
    email: 'admin1@tienda1.co',
    password: passwordHashed,
    role: 'ENTERPRISE_ADMIN',
    emailVerified: true,
    membership: {
      role: 'OWNER',
    }
  },
  {
    firstname: 'Staff1',
    lastname: 'Tienda1',
    phoneNumber: '999888222',
    address: 'Con dirección 222',
    email: 'staff1@tienda1.co',
    password: passwordHashed,
    role: 'ENTERPRISE_STAFF',
    emailVerified: true,
    membership: {
      role: 'MEMBER',
    }
  },
  {
    firstname: 'Customer1',
    lastname: 'Tienda1',
    phoneNumber: '999888333',
    address: 'Con dirección 333',
    email: 'customer1@tienda1.co',
    password: passwordHashed,
    role: 'ENTERPRISE_CUSTOMER',
    emailVerified: true,
    membership: {
      role: 'MEMBER',
    }
  },
  {
    firstname: 'Customer2',
    lastname: 'Tienda1',
    phoneNumber: '999888444',
    address: 'Con dirección 444',
    email: 'customer2@tienda1.co',
    password: passwordHashed,
    role: 'ENTERPRISE_CUSTOMER',
    emailVerified: true,
    membership: {
      role: 'MEMBER',
    }
  }
]

export const categories = [
  {
    'name': 'Category 1'
  },
  {
    'name': 'Category 2'
  }
]

export const productsCategory1 = [
  {
    name: 'Product 1',
    code: 'PC1001',
    price: 20.00,
    colors: ['Blanco'],
    sizes: ['XS', 'S'],
  }
]

export const productsCategory2 = [
  {
    name: 'Product 2',
    code: 'PC2001',
    price: 40.00,
    colors: ['Blanco', 'Azúl'],
    sizes: ['XS', 'S', 'M'],
  },
  {
    name: 'Product 3',
    code: 'PC2002',
    price: 80.00,
    colors: ['Blanco', 'Azúl', 'Guinda'],
    sizes: ['XS', 'S', 'M', 'L'],
  }
]

export const generateTienda1 = async () => {
  const getPlanFree = await prisma.plan.findFirst({ where: { name: PLAN_FREE } })

  const planId = getPlanFree.id
  const trialDuration = getPlanFree.duration
  
  const currentDate = new Date()
  const addDaysToCurrentDate = addDays(currentDate, trialDuration);

  const newEnterprise = await prisma.enterprise.create({ data: enterprise })
  const enterpriseId = newEnterprise.id

  // newSubscription
  await prisma.subscription.create({
    data: {
      trialStart: currentDate,
      trialEnd: addDaysToCurrentDate,
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

  const categoryIds = []

  for (let data of categories) {
    const newCategory = await prisma.category.create({
      data: {
        ...data,
        enterpriseId
      }
    })

    await categoryIds.push(newCategory.id)
  }

  for (let data of productsCategory1) {
    const categoryId = categoryIds.at(0)  // Category 1

    await prisma.product.create({
      data: {
        ...data,
        categoryId,
        enterpriseId
      }
    })
  }

  for (let data of productsCategory2) {
    const categoryId = categoryIds.at(1) // Category 2

    await prisma.product.create({
      data: {
        ...data,
        categoryId,
        enterpriseId
      }
    })
  }

  console.log('Seeding Tienda1: OK')
}

