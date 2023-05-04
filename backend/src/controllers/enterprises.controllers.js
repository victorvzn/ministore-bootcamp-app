import { Prisma } from "../libs/prisma.js"

export const listEnterprises = async (req, res) => {
  try {
    const userFound = req.user

    const userEnterpriseId = userFound.enterprise.id

    const enterprises = await Prisma.enterprise.findMany({
      where: {
        id: userEnterpriseId,
        active: true,
        deletedAt: null
      }
    })

    return res.status(201).json({ content: enterprises })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al lista las empresas', content: error.message })
  }
}