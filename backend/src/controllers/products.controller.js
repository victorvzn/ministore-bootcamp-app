import { Prisma } from "../libs/prisma.js"

export const createProduct = async (req, res) => {
  const data = req.body

  try {
    const userFound = req.user

    const newProduct = await Prisma.product.create({
      data: {
        ...data,
        enterpriseId: userFound.id
      }
    })

    return res.status(201).json({ content: newProduct, message: 'Producto creado exitosamente' })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al crear el producto', content: error.message })
  }
}

export const listProducts = async (req, res) => {
  try {
    const userFound = req.user

    

    const products = await Prisma.product.findMany()

    return res.status(200).json({ data: products })
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear el producto', content: error.message })
  }
}