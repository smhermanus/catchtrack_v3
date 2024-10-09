import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import getClient from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const logData = await request.json()

    console.log('Attempting to connect to the database')
    const client = await getClient()

    console.log('Successfully connected to the database')

    const result = await client.query(
      'INSERT INTO LOG_DATA (scale_id, landing_date, vessel_name, vessel_length, fishing_sector, gross_registered_tonnage, catch_area, subarea, traps_set, traps_pulled, bins_animals, total_catch_mass, number_of_catches, start_time, end_time, product_type, rights_holder_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING id',
      [
        logData.scale_id,
        logData.landing_date,
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
        logData.start_time,
        logData.end_time,
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
