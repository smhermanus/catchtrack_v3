// FormLayoutsAuditCatch.tsx

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
  id: number
  first_name: string
  surname: string
  id_number: string
  company_name: string
  rh_number: string
  permit_number: string
  marine_resources: string
  quota_code: string
  quota_allocated: number
  quota_used: number
  quota_balance: number
  vessel_name: string
  vessel_length: string
  factory_name: string
  factory_owner: string
  fishing_sector: string
  product_type: string
  catch_area: string
  subarea: string
}

interface LandingData {
  scale_id: string
  gross_registered_tonnage: string
  traps_set: string
  traps_pulled: string
  bins_animals: string
  total_catch_mass: string
  number_of_catches: string
  start_time: string
  end_time: string
}

export default function FormLayoutsAuditCatch() {
  const [rightsHolder, setRightsHolder] = useState<RightsHolder | null>(null)
  const [permitNumber, setPermitNumber] = useState('')

  const [landingData, setLandingData] = useState<LandingData>({
    scale_id: '',
    gross_registered_tonnage: '',
    traps_set: '',
    traps_pulled: '',
    bins_animals: '',
    total_catch_mass: '',
    number_of_catches: '',
    start_time: '',
    end_time: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRightsHolder = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/pages/rights-holder?permitNumber=${permitNumber}`)

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
        body: JSON.stringify({ ...landingData, rights_holder_id: rightsHolder.id })
      })

      if (!response.ok) {
        throw new Error('Failed to submit landing data')
      }

      alert('Landing data submitted successfully')

      // Reset form and state
      setLandingData({
        scale_id: '',
        gross_registered_tonnage: '',
        traps_set: '',
        traps_pulled: '',
        bins_animals: '',
        total_catch_mass: '',
        number_of_catches: '',
        start_time: '',
        end_time: ''
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
      <CardHeader title='Monitor / Fishery Control Officer ' />
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
                    label='ID Number'
                    value={rightsHolder.id_number}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Company Name'
                    value={rightsHolder.company_name}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Rights Holder Number'
                    value={rightsHolder.rh_number}
                    InputProps={{ readOnly: true }}
                  />
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
                    label='Quota Allocated'
                    value={rightsHolder.quota_allocated}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Quota Used'
                    value={rightsHolder.quota_used}
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
                    label='Vessel Name'
                    value={rightsHolder.vessel_name}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Vessel Length'
                    value={rightsHolder.vessel_length}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Factory Name'
                    value={rightsHolder.factory_name}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Factory Owner'
                    value={rightsHolder.factory_owner}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Fishing Sector'
                    value={rightsHolder.fishing_sector}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Product Type'
                    value={rightsHolder.product_type}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label='Catch Area'
                    value={rightsHolder.catch_area}
                    InputProps={{ readOnly: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField fullWidth label='Subarea' value={rightsHolder.subarea} InputProps={{ readOnly: true }} />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' className='font-medium' color='text.primary'>
                Input Landing Catch Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name='scale_id'
                label='Scale ID/Number'
                value={landingData.scale_id}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name='gross_registered_tonnage'
                label='Gross Registered Tonnage'
                type='number'
                value={landingData.gross_registered_tonnage}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name='traps_set'
                label='Number of Traps Set'
                type='number'
                value={landingData.traps_set}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name='traps_pulled'
                label='Number of Traps Pulled'
                type='number'
                value={landingData.traps_pulled}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name='bins_animals'
                label='Number of Bins/Animals'
                type='number'
                value={landingData.bins_animals}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name='total_catch_mass'
                label='Total Catch Mass (kg)'
                type='number'
                value={landingData.total_catch_mass}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name='number_of_catches'
                label='Number of Catches'
                type='number'
                value={landingData.number_of_catches}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name='start_time'
                label='Date of Departure'
                type='datetime-local'
                value={landingData.start_time}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                name='end_time'
                label='Date of Arrival'
                type='datetime-local'
                value={landingData.end_time}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button type='submit' variant='contained' color='primary' disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
          <Button
            type='reset'
            variant='outlined'
            onClick={() => {
              setLandingData({
                scale_id: '',
                gross_registered_tonnage: '',
                traps_set: '',
                traps_pulled: '',
                bins_animals: '',
                total_catch_mass: '',
                number_of_catches: '',
                start_time: '',
                end_time: ''
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
