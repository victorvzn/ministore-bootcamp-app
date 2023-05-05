import { PrismaClient } from '@prisma/client'
import { generatePlans } from  './plansSeed.js'
import { generateUsers } from  './usersSeed.js'
import { generateTienda1 } from  './tienda1Seed.js'
import { generateTienda2Empty } from  './tienda2SeedEmpty.js'

const prisma = new PrismaClient()

async function main() {
  await generatePlans()
  await generateUsers()

  await generateTienda1()
  await generateTienda2Empty()
}

main()
  .then(() => console.log('Seeding successfully!'))
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())