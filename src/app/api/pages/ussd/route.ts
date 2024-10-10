import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import AfricasTalking from 'africastalking'

import getClient from '@lib/db'

const africastalking = AfricasTalking({
  apiKey: process.env.AFRICASTALKING_API_KEY!,
  username: process.env.AFRICASTALKING_USERNAME!
})

interface RightsHolder {
  cell_phone: string
  id: number
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const { sessionId, serviceCode, phoneNumber, text } = (await request.json()) as {
    sessionId: string
    serviceCode: string
    phoneNumber: string
    text: string
  }

  console.log(`New USSD session: ${sessionId}, Service Code: ${serviceCode}, Phone: ${phoneNumber}, Text: ${text}`)

  let response: string = ''

  const client = await getClient()

  if (text === '') {
    response = `CON What would you like to do?
      1. Permit status
      2. Quota balance
      3. Notify Rights Holder`
  } else if (text === '1') {
    response = `CON Enter permit number or press 0 to return to the main menu`
  } else if (text.startsWith('1*')) {
    const permitNumber: string = text.split('*')[1]

    if (permitNumber === '0') {
      response = `CON What would you like to do?
        1. Permit status
        2. Quota balance
        3. Notify Rights Holder`
    } else {
      try {
        const result = await client.query<{ date_expiry: Date; quota_qty: number }>(
          'SELECT date_expiry, quota_qty FROM permits WHERE permit_number = $1',
          [permitNumber]
        )

        if (result.rows.length > 0) {
          const permit = result.rows[0]

          response = `END Permit ${permitNumber} is valid until ${permit.date_expiry.toDateString()} with a remaining quota of ${permit.quota_qty} kg.`
        } else {
          response = `END Permit ${permitNumber} not found`
        }
      } catch (error) {
        console.error('Error retrieving permit information:', error)
        response = `END An error occurred while checking the permit information`
      }
    }
  } else if (text === '2') {
    response = `CON Enter permit number or press 0 to return to the main menu`
  } else if (text.startsWith('2*')) {
    const permitNumber: string = text.split('*')[1]

    if (permitNumber === '0') {
      response = `CON What would you like to do?
        1. Permit status
        2. Quota balance
        3. Notify Rights Holder`
    } else {
      try {
        const result = await client.query<{ quota_qty: number }>(
          'SELECT quota_qty FROM permits WHERE permit_number = $1',
          [permitNumber]
        )

        if (result.rows.length > 0) {
          const quota = result.rows[0].quota_qty

          response = `END Remaining quota for permit ${permitNumber}: ${quota} kg`
        } else {
          response = `END Permit ${permitNumber} not found`
        }
      } catch (error) {
        console.error('Error retrieving quota information:', error)
        response = `END An error occurred while checking the quota`
      }
    }
  } else if (text === '3') {
    response = `CON Enter permit number or press 0 to return to the main menu`
  } else if (text.startsWith('3*')) {
    const permitNumber: string = text.split('*')[1]

    if (permitNumber === '0') {
      response = `CON What would you like to do?
        1. Permit status
        2. Quota balance
        3. Notify Rights Holder`
    } else {
      try {
        const result = await client.query<RightsHolder>(
          'SELECT rh.cell_phone, rh.id FROM rights_holders rh JOIN permits p ON p.permit_number = ANY(rh.permit_numbers) WHERE p.permit_number = $1',
          [permitNumber]
        )

        if (result.rows.length > 0) {
          const { cell_phone, id } = result.rows[0]

          await africastalking.SMS.send({
            to: [cell_phone],
            message: `Skipper with permit number ${permitNumber} intends to leave the harbor.`
          })

          await client.query(
            'INSERT INTO skipper_notifications (rights_holder_id, permit_number, notification_date) VALUES ($1, $2, NOW())',
            [id, permitNumber]
          )

          response = `END Notification sent to Rights Holder. Database updated.`
        } else {
          response = `END Permit ${permitNumber} not found`
        }
      } catch (error) {
        console.error('Error notifying Rights Holder:', error)
        response = `END An error occurred while notifying the Rights Holder`
      }
    }
  } else {
    response = `END Invalid input`
  }

  console.log(`USSD session ${sessionId} response: ${response}`)

  return NextResponse.json({ response })
}
