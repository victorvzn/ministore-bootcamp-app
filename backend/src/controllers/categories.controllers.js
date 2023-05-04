import { Prisma } from "../libs/prisma.js"

export const createCategory = async (req, res) => {
  const data = req.body

  try {
    const userFound = req.user

    const newCategory = await Prisma.category.create({
      data: {
        ...data,
        enterpriseId: userFound.enterprise.id
      }
    })

    return res.status(201).json({ message: 'Categoría creada exitosamente', content: newCategory })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al crear la categoría', content: error.message })
  }
}

export const listCategories = async (req, res) => {
  try {
    const userFound = req.user

    const userEnterpriseId = userFound.enterprise.id

    const fieldsAllowed = {
      id: true,
      name: true,

      active: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    }

    const categories = await Prisma.category.findMany({
      where: {
        enterpriseId: userEnterpriseId,
        active: true,
        deletedAt: null
      },
      select: fieldsAllowed
    })

    return res.status(200).json({ content: categories })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al listar las categorias', content: error.message })
  }
}

export const listCategoriesByStore = async (req, res) => {
  const enterpriseFound = req.enterprise

  const fieldsAllowed = {
    id: true,
    name: true
  }

  try {
    const categories = await Prisma.category.findMany({
      where: {
        enterpriseId: enterpriseFound.id,
        active: true,
        deletedAt: null
      },
      select: fieldsAllowed
    })

    return res.status(200).json({ content: categories })
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({ message: 'Error al listar las categorias', content: error.message })
  }
}

export const getCategory = async (req, res) => {
  const { id } = req.params

  try {
    const userFound = req.user

    const userEnterpriseId = userFound.enterprise.id

    const fieldsAllowed = {
      id: true,
      name: true,

      active: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true
    }

    const category = await Prisma.category.findFirst({
      where: {
        id,
        enterpriseId: userEnterpriseId,
        active: true,
        deletedAt: null
      },
      select: fieldsAllowed
    })

    if (!category) {
      return res.status(400).json({ message: 'No se encontró la categoría' })
    }

    return res.status(200).json({ content: category })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al obtener la categoría', content: error.message })
  }
}

export const updateCategory = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const userFound = req.user

    const userEnterpriseId = userFound.enterprise.id

    const fieldsAllowed = {
      id: true,
      name: true,

      active: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true
    }

    const category = await Prisma.category.update({
      where: { id, enterpriseId: userEnterpriseId.id },
      select: fieldsAllowed,
      data
    })

    return res.status(200).json({ message: 'Categoría actualizada exitosamente', content: category })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al actualizar la categoría', content: error.message })
  }
}

export const deleteCategory = async (req, res) => {
  const { id } = req.params

  try {
    const userFound = req.user

    const userEnterpriseId = userFound.enterprise.id

    const currentDate = new Date()

    const categoryDeleted = await Prisma.category.update({
      where: { id, enterpriseId: userEnterpriseId.id },
      data: {
        active: false,
        deletedAt: currentDate
      }
    })

    return res.status(200).json({
      message: 'Categoría eliminada exitosamente',
      content: { id: categoryDeleted.id }
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al eliminar la categoría', content: error.message })
  }
}