// FormLayoutsLogCatch.tsx

'use client'

import React, { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

// Styled Component Imports

interface RightsHolder {
  rh_number: number
  first_name: string
  surname: string
  marine_resources: string
  quota_code: string
  quota_balance: number
  date_expiry: Date
  permit_number: string
}

interface LandingData {
  cellphone_nr: string
  authorised_rep_name: string
}

export default function FormLayoutsLogCatch() {
  const [rightsHolder, setRightsHolder] = useState<RightsHolder | null>(null)
  const [permitNumber, setPermitNumber] = useState('')

  const [landingData, setLandingData] = useState<LandingData>({
    authorised_rep_name: '',
    cellphone_nr: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRightsHolder = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/pages/log-data?permitNumber=${permitNumber}`)

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`)
      }

      const data = await response.json()

      setRightsHolder(data)
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Error fetching rights holder data. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setLandingData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!rightsHolder) {
      setError('Rights holder information is required. Please fetch a rights holder first.')

      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/pages/log-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cellphone_nr: landingData.cellphone_nr, // Unpacking individual fields
          authorised_rep_name: landingData.authorised_rep_name, // Unpacking individual fields
          permit_number: rightsHolder.permit_number, // Permit number from rights holder data
          rh_number: rightsHolder.rh_number // Sending rights holder ID as well
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit landing data')
      }

      alert('Landing data submitted successfully')

      // Reset form and state
      setLandingData({
        authorised_rep_name: '',
        cellphone_nr: ''
      })

      setRightsHolder(null)
      setPermitNumber('')
    } catch (err) {
      setError('Error submitting landing data. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader title='Skipper / Authorised Representative Notification' />
      <Divider />
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label='Enter Permit Number'
                value={permitNumber}
                onChange={e => setPermitNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button onClick={fetchRightsHolder} variant='contained' color='primary' disabled={isLoading}>
                {isLoading ? 'Loading....' : 'Retrieve Rights Holder Details'}
              </Button>
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography color='error'>{error}</Typography>
              </Grid>
            )}

            {rightsHolder && (
              <>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant='body2' className='font-large font-weight-bold' color='text.secondary'>
                    Rights Holder Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='First Name'
                    value={rightsHolder.first_name}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label='Surname' value={rightsHolder.surname} InputProps={{ readOnly: true }} />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Marine Resources'
                    value={rightsHolder.marine_resources}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Quota Code'
                    value={rightsHolder.quota_code}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Quota Balance'
                    value={rightsHolder.quota_balance}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Expiry Date'
                    value={rightsHolder.date_expiry}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' className='font-medium' color='text.primary'>
                Skipper / Authorised Representative Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name='authorised_rep_name'
                label='Authorised Representative Name'
                value={landingData.authorised_rep_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name='cellphone_nr'
                label='Cellphone Number'
                type='number'
                value={landingData.cellphone_nr}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button type='submit' variant='contained' color='primary' disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Notify Rights Holder'}
          </Button>
          <Button
            type='reset'
            variant='outlined'
            onClick={() => {
              setLandingData({
                authorised_rep_name: '',
                cellphone_nr: ''
              })
              setRightsHolder(null)
              setPermitNumber('')
            }}
          >
            Reset
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}
