import type { NextApiRequest, NextApiResponse } from 'next'

import pool from '../../lib/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { permitNumber } = req.query

    try {
      const client = await pool.connect()

      const result = await client.query(
        'SELECT surname, id_number, company_name, rh_number, permit_number, marine_resources, quota_code, quota_qty FROM RIGHTS_HOLDERS WHERE permit_number = $1',
        [permitNumber]
      )

      client.release()

      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0])
      } else {
        res.status(404).json({ message: 'Rights holder not found' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching rights holder information' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
