import { NextResponse } from 'next/server'

import getClient from '@/lib/db' // Import your custom DB client

export async function GET() {
  try {
    // Get a fresh database client from your getClient function
    const client = await getClient()

    // Execute the query to fetch notifications
    const query = `
      SELECT id, authorised_rep_name, permit_number, date_sent, status
      FROM skipper_notifications
      ORDER BY date_sent DESC
    `

    const result = await client.query(query)

    // Check if there are new posts and return the latest data
    if (!result || result.rowCount === 0) {
      return NextResponse.json({ message: 'No notifications found' }, { status: 404 })
    }

    // Return the fetched data as a JSON response
    return NextResponse.json(result.rows, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Expires: '0',
        Pragma: 'no-cache',
        'Surrogate-Control': 'no-store'
      }
    })
  } catch (error) {
    console.error('Error fetching skipper notifications:', error)

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
