'use client'

import React, { useState } from 'react'

interface RightsHolder {
  id: number // Added this line
  surname: string
  id_number: string
  company_name: string
  rh_number: string
  permit_number: string
  marine_resources: string
  quota_code: string
  quota_qty: number
}

interface LandingData {
  scale_id: string
  vessel_name: string
  vessel_length: string
  fishing_sector: string
  gross_registered_tonnage: string
  catch_area: string
  subarea: string
  traps_set: string
  traps_pulled: string
  bins_animals: string
  total_catch_mass: string
  number_of_catches: string
  start_time: string
  end_time: string
  product_type: string
}

export default function MonitorPage() {
  const [rightsHolder, setRightsHolder] = useState<RightsHolder | null>(null)
  const [permitNumber, setPermitNumber] = useState('')

  const [landingData, setLandingData] = useState<LandingData>({
    scale_id: '',
    vessel_name: '',
    vessel_length: '',
    fishing_sector: '',
    gross_registered_tonnage: '',
    catch_area: '',
    subarea: '',
    traps_set: '',
    traps_pulled: '',
    bins_animals: '',
    total_catch_mass: '',
    number_of_catches: '',
    start_time: '',
    end_time: '',
    product_type: ''
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRightsHolder = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/pages/rights-holder?permitNumber=${permitNumber}`)

      if (!response.ok) {
        const errorBody = await response.text()

        console.error(`HTTP error! status: ${response.status}, body: ${errorBody}`)
        throw new Error(`HTTP error ${response.status}`)
      }

      const data = await response.json()

      console.log('Fetched rights holder data:', data) // Log the fetched data
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
        vessel_name: '',
        vessel_length: '',
        fishing_sector: '',
        gross_registered_tonnage: '',
        catch_area: '',
        subarea: '',
        traps_set: '',
        traps_pulled: '',
        bins_animals: '',
        total_catch_mass: '',
        number_of_catches: '',
        start_time: '',
        end_time: '',
        product_type: ''
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
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Monitor Page</h1>

      <div className='mb-4'>
        <input
          type='text'
          placeholder='Enter Permit Number'
          className='border p-2 mr-2'
          value={permitNumber}
          onChange={e => setPermitNumber(e.target.value)}
        />
        <button onClick={fetchRightsHolder} className='bg-blue-500 text-white p-2 rounded' disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Fetch Rights Holder'}
        </button>
      </div>

      {error && <p className='text-red-500 mb-4'>{error}</p>}

      {rightsHolder && (
        <div className='mb-4 p-4 bg-gray-100 rounded'>
          <h2 className='text-xl font-semibold mb-2'>Rights Holder Information</h2>
          <p>ID: {rightsHolder.id}</p>
          <p>Surname: {rightsHolder.surname}</p>
          <p>ID Number: {rightsHolder.id_number}</p>
          <p>Company Name: {rightsHolder.company_name}</p>
          <p>RH Number: {rightsHolder.rh_number}</p>
          <p>Permit Number: {rightsHolder.permit_number}</p>
          <p>Marine Resources: {rightsHolder.marine_resources}</p>
          <p>Quota Code: {rightsHolder.quota_code}</p>
          <p>Quota Quantity: {rightsHolder.quota_qty} kg</p>
        </div>
      )}

      {rightsHolder && (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <h2 className='text-xl font-semibold mb-2'>Landing Information</h2>
          <input
            name='scale_id'
            value={landingData.scale_id}
            onChange={handleInputChange}
            placeholder='Scale ID/Number'
            className='border p-2 w-full'
          />
          <input
            name='vessel_name'
            value={landingData.vessel_name}
            onChange={handleInputChange}
            placeholder='Name of Vessel'
            className='border p-2 w-full'
          />
          <input
            name='vessel_length'
            value={landingData.vessel_length}
            onChange={handleInputChange}
            placeholder='Length of Vessel'
            className='border p-2 w-full'
          />
          <input
            name='fishing_sector'
            value={landingData.fishing_sector}
            onChange={handleInputChange}
            placeholder='Fishing Sector'
            className='border p-2 w-full'
          />
          <input
            name='gross_registered_tonnage'
            value={landingData.gross_registered_tonnage}
            onChange={handleInputChange}
            type='number'
            placeholder='Gross Registered Tonnage'
            className='border p-2 w-full'
          />
          <input
            name='catch_area'
            value={landingData.catch_area}
            onChange={handleInputChange}
            placeholder='Catch Area'
            className='border p-2 w-full'
          />
          <input
            name='subarea'
            value={landingData.subarea}
            onChange={handleInputChange}
            placeholder='Subarea'
            className='border p-2 w-full'
          />
          <input
            name='traps_set'
            value={landingData.traps_set}
            onChange={handleInputChange}
            type='number'
            placeholder='Number of Traps Set'
            className='border p-2 w-full'
          />
          <input
            name='traps_pulled'
            value={landingData.traps_pulled}
            onChange={handleInputChange}
            type='number'
            placeholder='Number of Traps Pulled'
            className='border p-2 w-full'
          />
          <input
            name='bins_animals'
            value={landingData.bins_animals}
            onChange={handleInputChange}
            type='number'
            placeholder='Number of Bins/Animals'
            className='border p-2 w-full'
          />
          <input
            name='total_catch_mass'
            value={landingData.total_catch_mass}
            onChange={handleInputChange}
            type='number'
            placeholder='Total Catch Mass (kg)'
            className='border p-2 w-full'
          />
          <input
            name='number_of_catches'
            value={landingData.number_of_catches}
            onChange={handleInputChange}
            type='number'
            placeholder='Number of Catches'
            className='border p-2 w-full'
          />
          <input
            name='start_time'
            value={landingData.start_time}
            onChange={handleInputChange}
            type='datetime-local'
            placeholder='Start Time'
            className='border p-2 w-full'
          />
          <input
            name='end_time'
            value={landingData.end_time}
            onChange={handleInputChange}
            type='datetime-local'
            placeholder='End Time'
            className='border p-2 w-full'
          />
          <input
            name='product_type'
            value={landingData.product_type}
            onChange={handleInputChange}
            placeholder='Type of Product'
            className='border p-2 w-full'
          />
          <button type='submit' className='bg-blue-500 text-white p-2 rounded' disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      )}
    </div>
  )
}
