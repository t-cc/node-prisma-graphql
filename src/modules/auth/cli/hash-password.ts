import bcrypt from 'bcrypt'
import 'dotenv/config'

const SALT_ROUNDS = 10
const SECRET_KEY = process.env.SECRET_KEY

async function main() {
  const args = process.argv.slice(1)

  if (args.length !== 2) {
    console.log('Usage: pnpm hash-password <password>')
    process.exit(1)
  }

  const password = args[1]
  const hash = await bcrypt.hash(`${password}${SECRET_KEY}`, SALT_ROUNDS)
  console.log(hash)
  return
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
