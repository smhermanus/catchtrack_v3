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

    const query =
      'SELECT id, first_name,surname, id_number, company_name, rh_number, permit_number, marine_resources, quota_code, quota_allocated, quota_used, quota_balance, vessel_name, vessel_length, factory_name, factory_owner, fishing_sector, product_type, catch_area, subarea FROM RIGHTS_HOLDERS WHERE permit_number = $1'

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
    const logData = await request.json()

    console.log('Attempting to connect to the database')
    const client = await getClient()

    console.log('Successfully connected to the database')

    const result = await client.query(
      'INSERT INTO LOG_DATA (scale_id, vessel_name, vessel_length, fishing_sector, gross_registered_tonnage, catch_area, subarea, traps_set, traps_pulled, bins_animals, total_catch_mass, number_of_catches, departure_date, landing_date, product_type, rights_holder_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id',
      [
        logData.scale_id,
        logData.vessel_name,
        logData.vessel_length,
        logData.fishing_sector,
        logData.gross_registered_tonnage,
        logData.catch_area,
        logData.subarea,
        logData.traps_set,
        logData.traps_pulled,
        logData.bins_animals,
        logData.total_catch_mass,
        logData.number_of_catches,
        logData.departure_date,
        logData.landing_date,
        logData.product_type,
        logData.rights_holder_id
      ]
    )

    console.log('Log data inserted successfully')

    return NextResponse.json({ id: result.rows[0].id }, { status: 201 })
  } catch (error) {
    console.error('Error submitting log data:', error)

    return NextResponse.json({ message: 'Error submitting log data', error: (error as Error).message }, { status: 500 })
  }
}
