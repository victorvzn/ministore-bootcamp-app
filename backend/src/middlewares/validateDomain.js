import { Prisma } from "../libs/prisma.js"

export const validateDomain = async (req, res, next) => {
  try {
    const { domain } = req.query
    
    if (!domain) throw new Error('Error validando domain')
    
    const enterpriseFound = await Prisma.enterprise.findFirst({
      where: { domain },
      select: { id: true, name: true, domain: true }
    })

    const userEnterpriseFound = await Prisma.membership.findFirst({
      where: { enterpriseId: enterpriseFound.id },
      select: { id: true, role: true }
    })

    req.enterprise = {
      ...enterpriseFound,
      membership: userEnterpriseFound
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Error',
      content: error.message
    })
  }
}