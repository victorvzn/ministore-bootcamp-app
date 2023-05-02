import { PrismaClient } from '@prisma/client'
import { plans } from  './plansSeed.js'
import { users } from  './usersSeed.js'

const prisma = new PrismaClient()

async function main() {
  for (let data of plans) {
    await prisma.plan.create({ data })
  }

  for (let data of users) {
    await prisma.user.create({ data })
  }
}

main()
  .then(() => console.log('Seeding successfully!'))
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())