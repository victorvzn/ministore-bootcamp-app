import { Prisma } from "../libs/prisma.js"

export const createProduct = async (req, res) => {
  const data = req.body

  try {
    const userFound = req.user

    const newProduct = await Prisma.product.create({
      data: {
        ...data,
        enterpriseId: userFound.enterprise.id
      }
    })

    return res.status(201).json({ message: 'Producto creado exitosamente', content: newProduct })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al crear el producto', content: error.message })
  }
}

export const listProducts = async (req, res) => {
  try {
    const userFound = req.user

    const userEnterpriseId = userFound.enterprise.id

    const fieldsAllowed = {
      id: true, 
      name: true,
      price: true,
      categoryId: true,
      description: true,
      category: {
        select: {
          id: true,
          name: true
        },
      },
      code: true,
      discountPercentage: true,
      stock: true,
      brand: true,
      thumbnail: true,
      images: true,
      sizes: true,
      colors: true,

      published: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    }

    const products = await Prisma.product.findMany({
      where: {
        enterpriseId: userEnterpriseId,
        active: true,
        deletedAt: null,
        published: true
      },
      select: fieldsAllowed
    })

    return res.status(200).json({ content: products })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al listar los productos', content: error.message })
  }
}

export const listProductsPublic = async (req, res) => {
  const enterpriseFound = req.enterprise

  const fieldsAllowed = {
    id: true,
    name: true,
    price: true,
    categoryId: true,
    description: true,
    category: {
      select: {
        id: true,
        name: true
      },
    },
    code: true,
    discountPercentage: true,
    stock: true,
    brand: true,
    thumbnail: true,
    images: true,
    sizes: true,
    colors: true,
  }

  try {
    const products = await Prisma.product.findMany({
      where: {
        enterpriseId: enterpriseFound.id,
        active: true,
        deletedAt: null,
        published: true
      },
      select: fieldsAllowed
    })

    return res.status(200).json({ content: products })
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({ message: 'Error al listar los productos', content: error.message })
  }
}

export const getProduct = async (req, res) => {
  const { id } = req.params

  try {
    const userFound = req.user

    const userEnterpriseId = userFound.enterprise.id

    const fieldsAllowed = {
      id: true,
      name: true,
      price: true,
      categoryId: true,
      description: true,
      category: {
        select: {
          id: true,
          name: true
        },
      },
      code: true,
      discountPercentage: true,
      stock: true,
      brand: true,
      thumbnail: true,
      images: true,
      sizes: true,
      colors: true,

      published: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    }

    const product = await Prisma.product.findFirst({
      where: {
        id,
        enterpriseId: userEnterpriseId,
        active: true,
        deletedAt: null,
        published: true
      },
      select: fieldsAllowed
    })

    if (!product) {
      return res.status(400).json({ message: 'No se encontró el producto' })
    }

    return res.status(200).json({ content: product })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al obtener el producto', content: error.message })
  }
}

export const updateProduct = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const userFound = req.user

    const userEnterpriseId = userFound.enterprise.id

    const fieldsAllowed = {
      id: true,
      name: true,
      price: true,
      categoryId: true,
      description: true,
      category: {
        select: {
          id: true,
          name: true
        },
      },
      code: true,
      discountPercentage: true,
      stock: true,
      brand: true,
      thumbnail: true,
      images: true,
      sizes: true,
      colors: true,

      published: true,
      active: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    }

    const product = await Prisma.product.update({
      where: { id, enterpriseId: userEnterpriseId.id },
      select: fieldsAllowed,
      data
    })

    return res.status(200).json({ message: 'Producto actualizado exitosamente', content: product })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al actualizar producto', content: error.message })
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    const userFound = req.user

    const userEnterpriseId = userFound.enterprise.id

    const currentDate = new Date()

    const productDeleted = await Prisma.product.update({
      where: { id, enterpriseId: userEnterpriseId.id },
      data: {
        active: false,
        deletedAt: currentDate
      }
    })

    return res.status(200).json({
      message: 'Producto eliminado exitosamente',
      content: { id: productDeleted.id }
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al eliminar producto', content: error.message })
  }
}