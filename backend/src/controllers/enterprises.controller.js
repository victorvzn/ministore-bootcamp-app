import { Prisma } from "../libs/prisma.js"

import slugify from 'slugify'
import { addDays } from 'date-fns'
import bcrypt from 'bcryptjs'

const DEFAULT_CATEGORY = 'General'
const DEFAULT_MEMBERSHIP_ROLE = 'OWNER'
const PLAN_FREE = 'Free'

export const registerEnterprise = async (req, res) => {
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

export const listEnterprises = async (req, res) => {
  try {
    const enterprises = await Prisma.enterprise.findMany()

    return res.status(201).json({ content: enterprises })
  } catch (error) {
    return res.status(400).json({ message: 'Error al crear la empresa', content: error.message })
  }
}