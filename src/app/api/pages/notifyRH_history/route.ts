import { NextResponse } from 'next/server'

import getClient from '@/lib/db' // Import your custom DB client

export async function GET() {
  try {
    // Get a database client from your getClient function
    const client = await getClient()

    // Execute the query
    const query = `
      SELECT id, authorised_rep_name, permit_number, date_sent, status
      FROM skipper_notifications
    `

    const result = await client.query(query)

    // Return the data as a JSON response
    return NextResponse.json(result.rows, { status: 200 })
  } catch (error) {
    console.error('Error fetching skipper notifications:', error)

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
