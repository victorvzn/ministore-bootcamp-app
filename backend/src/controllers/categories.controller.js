import { Prisma } from "../libs/prisma.js"

export const createCategory = async (req, res) => {
  const data = req.body

  try {
    const userFound = req.user

    const newCategory = await Prisma.category.create({
      data: {
        ...data,
        enterpriseId: userFound.id
      }
    })

    return res.status(201).json({ content: newCategory, message: 'Categoria creada exitosamente' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al crear la categoria', content: error.message })
  }
}

export const listCategories = async (req, res) => {
  try {
    const categories = await Prisma.category.findMany()

    return res.status(200).json({ content: categories })
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear la categoria', content: error.message })
  }
}