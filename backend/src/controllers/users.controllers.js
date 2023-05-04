import { Prisma } from "../libs/prisma.js"
import bcrypt from 'bcryptjs'

const DEFAULT_ROLE = 'ENTERPRISE_STAFF'
const DEFAULT_MEMBERSHIP_ROLE = 'MEMBER'

export const createUser = async (req, res) => {
  const data = req.body

  try {
    const userEnterpriseFound = req.user.enterprise

    const passwordHashed = bcrypt.hashSync(data.password, 10);

    const newUser = await Prisma.user.create({
      data: {
        ...data,
        role: DEFAULT_ROLE,
        password: passwordHashed
      }
    })

    const newMembership = await Prisma.membership.create({
      data: {
        role: DEFAULT_MEMBERSHIP_ROLE,
        enterpriseId: userEnterpriseFound.id,
        userId: newUser.id
      }
    })

    return res.status(201).json({
      message: 'Usuario creado exitosamente',
      content: {
        newUser,
        newMembership
      }
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al crear el usuario', content: error.message })
  }
}

export const listUsers = async (req, res) => {
  try {
    const userFound = req.user

    const userEnterpriseId = userFound.enterprise.id
    
    const fieldsAllowed = {
      id: true,
      firstname: true,
      lastname: true,
      phoneNumber: true,
      address: true,
      email: true,
      role: true,
      emailVerified: true,

      active: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    }

    const memberships = await Prisma.membership.findMany({
      where: {
        enterpriseId: userEnterpriseId,
        user: {
          is: {
            active: true,
            deletedAt: null
          }
        }
      },
      include: {
        user: {
          select: {
            ...fieldsAllowed
          }
        }
      }
    })

    const users = memberships.map(membership => ({ ...membership.user }))

    return res.status(200).json({ content: users })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al listar usuario', content: error.message })
  }
}

export const getUser = async (req, res) => {
  const { id } = req.params

  try {
    const userFound = req.user

    const userEnterpriseId = userFound.enterprise.id

    const fieldsAllowed = {
      id: true,
      firstname: true,
      lastname: true,
      phoneNumber: true,
      address: true,
      email: true,
      emailVerified: true,

      active: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    }

    const user = await Prisma.membership.findFirst({
      where: {
        userId: id,
        enterpriseId: userEnterpriseId,
        user: {
          is: {
            active: true,
            deletedAt: null
          }
        }
      },
      include: {
        user: {
          select: {
            ...fieldsAllowed
          }
        }
      }
    })

    if (!user) {
      return res.status(400).json({ message: 'No se encontró el usuario' })
    }

    return res.status(200).json({ content: user?.user })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al obtener el usuario', content: error.message })
  }
}

export const updateUser = async (req, res) => {
  const { id } = req.params
  const data = req.body

  try {
    const userFound = req.user

    const userEnterpriseId = userFound.enterprise.id

    const fieldsAllowed = {
      firstname: true,
      lastname: true,
      phoneNumber: true,
      address: true,
      email: true,

      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    }

    const userMembershipFound = await Prisma.membership.findFirst({
      where: { userId: id, enterpriseId: userEnterpriseId },
      include: {
        user: {
          select: {
            id: true
          }
        }
      }
    })

    if (!userMembershipFound) {
      return res.status(400).json({ message: 'No se encontró el usuario' })
    }

    const user = await Prisma.user.update({
      where: { id: userMembershipFound.user.id  },
      select: fieldsAllowed,
      data
    })

    return res.status(200).json({ message: 'Usuario actualizado exitosamente', content: user })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al actualizar el usuario', content: error.message })
  }
}

export const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const userFound = req.user

    const userEnterpriseId = userFound.enterprise.id

    const userMembershipFound = await Prisma.membership.findFirst({
      where: { userId: id, enterpriseId: userEnterpriseId },
      include: {
        user: {
          select: {
            id: true
          }
        }
      }
    })

    if (!userMembershipFound) {
      return res.status(400).json({ message: 'No se encontró el usuario' })
    }

    const currentDate = new Date()

    const userDeleted = await Prisma.user.update({
      where: { id: userMembershipFound.user.id },
      data: {
        active: false,
        deletedAt: currentDate
      }
    })

    return res.status(200).json({
      message: 'Usuario eliminado exitosamente',
      content: { id: userDeleted.id }
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al eliminar el usuario', content: error.message })
  }
}
