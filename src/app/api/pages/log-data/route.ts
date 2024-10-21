import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import getClient from '@/lib/db'

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
    const client = await getClient()

    console.log('Successfully connected to Neon database')

    const query = `
      SELECT id, first_name, surname, id_number, marine_resources, quota_code, quota_balance,date_expiry
      FROM RIGHTS_HOLDERS
      WHERE permit_number = $1
    `

    console.log('Executing query:', query)
    const result = await client.query(query, [permitNumber])

    console.log('Query result:', result.rows)

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0])
    } else {
      console.log('No rights holder found for permit number:', permitNumber)

      return NextResponse.json({ message: 'Rights holder not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error fetching rights holder from Neon:', error)

    return NextResponse.json({ message: 'Internal server error', error: (error as Error).message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const notifyRHSData = await request.json()

    console.log('Attempting to connect to the database')
    const client = await getClient()

    console.log('Successfully connected to the database')

    // Insert query with corrected placeholders
    const result = await client.query(
      'INSERT INTO SKIPPER_NOTIFICATIONS (cellphone_nr, permit_number, authorised_rep_name, status) VALUES ($1, $2, $3, $4) RETURNING id',
      [notifyRHSData.cellphone_nr, notifyRHSData.permit_number, notifyRHSData.authorised_rep_name, 'approved']
    )

    console.log('Log data inserted successfully')

    return NextResponse.json({ id: result.rows[0].id }, { status: 201 })
  } catch (error) {
    console.error('Error submitting notification data:', error)

    return NextResponse.json({ message: 'Error submitting log data', error: (error as Error).message }, { status: 500 })
  }
}
