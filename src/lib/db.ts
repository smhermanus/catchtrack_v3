import { Pool } from 'pg'

console.log('Initializing database connection to Neon')
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set')
console.log('NODE_ENV:', process.env.NODE_ENV)

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

pool.on('connect', () => {
  console.log('Connected to the Neon database')
})

pool.on('error', err => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

export default pool
