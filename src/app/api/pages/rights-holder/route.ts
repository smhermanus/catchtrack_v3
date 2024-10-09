import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import pool from '@/lib/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const permitNumber = searchParams.get('permitNumber')

  if (!permitNumber) {
    return NextResponse.json({ message: 'Permit number is required' }, { status: 400 })
  }

  try {
    const client = await pool.connect()

    const result = await client.query(
      'SELECT id, surname, id_number, company_name, rh_number, permit_number, marine_resources, quota_code, quota_qty FROM RIGHTS_HOLDERS WHERE permit_number = $1',
      [permitNumber]
    )

    client.release()

    if (result.rows.length > 0) {
      return NextResponse.json(result.rows[0])
    } else {
      return NextResponse.json({ message: 'Rights holder not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error fetching rights holder:', error)

    return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
  }
}
