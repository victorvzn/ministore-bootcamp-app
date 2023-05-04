import { Prisma } from "../libs/prisma.js"

export const listEnterprises = async (req, res) => {
  try {
    const enterprises = await Prisma.enterprise.findMany()

    return res.status(201).json({ content: enterprises })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al crear la empresa', content: error.message })
  }
}