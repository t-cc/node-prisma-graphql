import bcrypt from 'bcrypt'
import 'dotenv/config'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const SALT_ROUNDS = 10
const SECRET_KEY = process.env.SECRET_KEY

async function main() {
  const args = process.argv.slice(2)

  if (args.length !== 2) {
    console.log('Usage: pnpm create-super-user <email> <password>')
    process.exit(1)
  }

  const email = args[0]
  const password = args[1]
  const hash = await bcrypt.hash(`${password}${SECRET_KEY}`, SALT_ROUNDS)
  await prisma.user.create({
    data: {
      email,
      password: hash,
      isSuperAdmin: true,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
