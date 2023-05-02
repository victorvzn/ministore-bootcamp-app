import { Prisma } from "../libs/prisma.js"

export const createEnterprise = async (req, res) => {
  const data = req.body

  try {
    const newEnterprise = await Prisma.enterprise.create({ data })

    return res.status(201).json({ content: newEnterprise, message: 'Empresa creada exitosamente' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al crear la empresa', content: error.message })
  }
}

export const listEnterprises = async (req, res) => {
  try {
    const enterprises = await Prisma.enterprise.findMany()

    return res.status(201).json({ content: enterprises })
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear la empresa', content: error.message })
  }
}