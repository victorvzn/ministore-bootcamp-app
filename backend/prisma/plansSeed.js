import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const plans = [
  {
    name: 'Free',
    description: 'For hobbyists, students, and indie hackers.',
    price: 0.00,
    duration: 7
  },
  {
    name: 'Entrepreneur',
    description: 'For small entrepreneurs and early-stage startups.',
    price: 5.00,
    duration: 30
  },
  {
    name: 'Premium',
    description: 'For larger teams with complex needs.',
    price: 10.00,
    duration: 30
  }
]

export const generatePlans = async () => {
  for (let data of plans) {
    await prisma.plan.create({ data })
  }

  console.log('Seeding plans by default: OK')
}