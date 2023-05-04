import { Prisma } from "../libs/prisma.js"

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import slugify from 'slugify'
import { addDays } from 'date-fns'

const DEFAULT_CATEGORY = 'General'
const DEFAULT_MEMBERSHIP_ROLE = 'OWNER'
const PLAN_FREE = 'Free'

export const authRegister = async (req, res) => {
  try {
    const { name, firstname, lastname, email, password, domain } = req.body
    
    const domainNormalized = slugify(domain)

    const newEnterprise = await Prisma.enterprise.create({
      data: {
        name,
        domain: domainNormalized
      }
    })

    const passwordHashed = bcrypt.hashSync(password, 10);

    const newUser = await Prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: passwordHashed
      }
    })

    const newMembership = await Prisma.membership.create({
      data: {
        role: DEFAULT_MEMBERSHIP_ROLE,
        enterpriseId: newEnterprise.id,
        userId: newUser.id
      }
    })

    const getPlanFree = await Prisma.plan.findFirst({ where: { name: PLAN_FREE } })

    const currentDate = new Date()
  
    const addDaysToCurrentDate = addDays(currentDate, getPlanFree.duration);

    const newSubscription = await Prisma.subscription.create({
      data: {
        trialStart: currentDate,
        trialEnd: addDaysToCurrentDate,
        trialDuration: getPlanFree.duration,
        planId: getPlanFree.id,
        enterpriseId: newEnterprise.id
      }
    })

    const newCategory = await Prisma.category.create({
      data: { name: DEFAULT_CATEGORY, enterpriseId: newEnterprise.id }
    })

    return res.status(201).json({
      content: {
        newEnterprise,
        newUser,
        newMembership,
        newSubscription,
        newCategory,
        currentDate,
        addDaysToCurrentDate,
        getPlanFree
      }, message: 'Empresa creada exitosamente'
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al crear la empresa', content: error.message })
  }
}

export const authLogin = async (req, res) => {
  const { email, password } = req.body

  try {
    const userFound = await Prisma.user.findUnique({ where: { email } })

    if (!userFound) {
      throw new Error('User is not exist')
    }

    const isVerifiedPassword = bcrypt.compareSync(password, userFound.password)

    if (isVerifiedPassword) {
      const payload = {
        jti: userFound.id,
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        role: userFound.role
      }
      const secretKey = process.env.JWT_SECRET
      const options = { expiresIn: '1h' }

      const token = jwt.sign(payload, secretKey, options)

      return res.json({ token })
    } else {
      throw new Error('Incorrect credentials')
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: 'Error al autenticar el usuario' })
  }
}