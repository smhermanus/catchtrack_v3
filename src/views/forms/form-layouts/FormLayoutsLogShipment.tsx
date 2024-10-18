'use client'

// React Imports
import { useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Select from '@mui/material/Select'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'

// Styled Component Imports
import AppReactDatepicker from '@/libs/styles/AppReactDatepicker'

// Type
type FormDataType = {
  username: string
  email: string
  password: string
  isPasswordShown: boolean
  confirmPassword: string
  isConfirmPasswordShown: boolean
  firstName: string
  lastName: string
  country: string
  language: string[]
  date: Date | null
  phoneNumber: string
}

const FormLayoutsLogShipment = () => {
  // States
  const [formData, setFormData] = useState<FormDataType>({
    username: '',
    email: '',
    password: '',
    isPasswordShown: false,
    confirmPassword: '',
    isConfirmPasswordShown: false,
    firstName: '',
    lastName: '',
    country: '',
    language: [],
    date: null,
    phoneNumber: ''
  })

  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      isPasswordShown: false,
      confirmPassword: '',
      isConfirmPasswordShown: false,
      firstName: '',
      lastName: '',
      country: '',
      language: [],
      date: null,
      phoneNumber: ''
    })
  }

  return (
    <Card>
      <CardHeader title='2024/2025' />
      <Divider />
      <form onSubmit={e => e.preventDefault()}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' className='font-medium' color='text.primary'>
                1. New Log
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Port</InputLabel>
                <Select
                  multiple
                  label='Language'
                  value={formData.language}
                  onChange={e => setFormData({ ...formData, language: e.target.value as string[] })}
                >
                  <MenuItem value='capetown'>Cape Town Harbour</MenuItem>
                  <MenuItem value='saldanha'>Saldanha Harbour</MenuItem>
                  <MenuItem value='durban'>Durban Harbour</MenuItem>
                  <MenuItem value='richardsbay'>Richards Bay Harbour</MenuItem>
                  <MenuItem value='mosselbay'>Mosselbay Harbour</MenuItem>
                  <MenuItem value='eastlondon'>East London Harbour</MenuItem>
                  <MenuItem value='portelizabeth'>Port Elizabeth Harbour</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppReactDatepicker
                selected={formData.date}
                showYearDropdown
                showMonthDropdown
                onChange={(date: Date | null) => setFormData({ ...formData, date })}
                placeholderText='MM/DD/YYYY'
                customInput={<TextField fullWidth label='Log Date' placeholder='MM-DD-YYYY' />}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Catch</InputLabel>
                <Select
                  multiple
                  label='Catch'
                  value={formData.language}
                  onChange={e => setFormData({ ...formData, language: e.target.value as string[] })}
                >
                  <MenuItem value='Angelfish'>Angelfish</MenuItem>
                  <MenuItem value='BlackTail'>BlackTail</MenuItem>
                  <MenuItem value='Capedory'>Cape Dory</MenuItem>
                  <MenuItem value='CapeSalmon'>Cape Salmon</MenuItem>
                  <MenuItem value='Crab'>Crab</MenuItem>
                  <MenuItem value='Hake'>Hake</MenuItem>
                  <MenuItem value='HorseMackerel'>Horse Mackerel</MenuItem>
                  <MenuItem value='KingFish'>KingFish</MenuItem>
                  <MenuItem value='Longfin'>Longfin Tuna</MenuItem>
                  <MenuItem value='RedGurnard'>Red gurnard,</MenuItem>
                  <MenuItem value='RockCod'>Rock Cod</MenuItem>
                  <MenuItem value='Snoek'>Snoek</MenuItem>
                  <MenuItem value='Yellowtail'>Yellowtail</MenuItem>
                  <MenuItem value='Yellowfin'>Yellowfin Tuna</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='quantity'
                placeholder='Quantity '
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Weight'
                placeholder='Weight '
                value={formData.username}
                onChange={e => setFormData({ ...formData, username: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Country</InputLabel>
                <Select
                  label='Country'
                  value={formData.country}
                  onChange={e => setFormData({ ...formData, country: e.target.value })}
                >
                  <MenuItem value='SouthAfrica'>South Africa</MenuItem>
                  <MenuItem value='Namibia'>UK</MenuItem>
                  <MenuItem value='Mozambique'>USA</MenuItem>
                  <MenuItem value='Angola'>Australia</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='body2' className='font-medium' color='text.primary'>
                2. Driver Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Driver'
                placeholder='Name'
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Company'
                placeholder='Individual or Company/Factory'
                value={formData.firstName}
                onChange={e => setFormData({ ...formData, firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='ID Number'
                placeholder='ID'
                value={formData.lastName}
                onChange={e => setFormData({ ...formData, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Permit Types</InputLabel>
                <Select
                  multiple
                  label='Language'
                  value={formData.language}
                  onChange={e => setFormData({ ...formData, language: e.target.value as string[] })}
                >
                  <MenuItem value='CatchIRNearshore'>Catch IR Nearshore</MenuItem>
                  <MenuItem value='CatchIROffshore'>Catch IR Offshore</MenuItem>
                  <MenuItem value='CatchNearshore'>Catch nearshore</MenuItem>
                  <MenuItem value='CatchOffshore'>Catch offshore</MenuItem>
                  <MenuItem value='VesselLicense'>Vessel license</MenuItem>
                  <MenuItem value='Transport'>Transport</MenuItem>
                  <MenuItem value='ExportLive'>Export live</MenuItem>
                  <MenuItem value='ExportFrozen'>Export frozen</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <AppReactDatepicker
                selected={formData.date}
                showYearDropdown
                showMonthDropdown
                onChange={(date: Date | null) => setFormData({ ...formData, date })}
                placeholderText='MM/DD/YYYY'
                customInput={<TextField fullWidth label='Date' placeholder='MM-DD-YYYY' />}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Truck Reg Nr'
                type='number'
                placeholder='Truck Registration Number'
                value={formData.phoneNumber}
                onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button type='submit' variant='contained'>
            Submit
          </Button>
          <Button
            type='reset'
            variant='outlined'
            onClick={() => {
              handleReset()
            }}
          >
            Reset
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsLogShipment
