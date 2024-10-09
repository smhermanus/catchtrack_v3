import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import pool from '@/lib/db'

export async function GET(request: NextRequest) {
  console.log('API route hit')
  const { searchParams } = new URL(request.url)
  const permitNumber = searchParams.get('permitNumber')

  console.log('Permit Number:', permitNumber)

  if (!permitNumber) {
    console.log('No permit number provided')

    return NextResponse.json({ message: 'Permit number is required' }, { status: 400 })
  }

  try {
    console.log('Attempting database connection to Neon')
    const client = await pool.connect()

    console.log('Successfully connected to Neon database')

    const query =
      'SELECT id, surname, id_number, company_name, rh_number, permit_number, marine_resources, quota_code, quota_qty FROM RIGHTS_HOLDERS WHERE permit_number = $1'

    console.log('Executing query:', query)

    const result = await client.query(query, [permitNumber])

    client.release()

    console.log('Query result:', result.rows)

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0])
    } else {
      console.log('No rights holder found for permit number:', permitNumber)

      return NextResponse.json({ message: 'Rights holder not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error fetching rights holder from Neon:', error)

    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
