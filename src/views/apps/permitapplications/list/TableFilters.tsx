// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

// Type Imports
import type { UsersType } from '@/types/apps/userTypes'

const TableFilters = ({ setData, tableData }: { setData: (data: UsersType[]) => void; tableData?: UsersType[] }) => {
  // States
  const [permit, setPermit] = useState<UsersType['permit']>('')
  const [plan, setPlan] = useState<UsersType['currentPlan']>('')
  const [statusapplications, setStatusApplications] = useState<UsersType['status']>('')

  useEffect(() => {
    const filteredData = tableData?.filter(permitapplications => {
      if (permit && permitapplications.permit !== permit) return false
      if (plan && permitapplications.currentPlan !== plan) return false
      if (statusapplications && permitapplications.statusapplications !== statusapplications) return false

      return true
    })

    setData(filteredData || [])
  }, [permit, plan, statusapplications, tableData, setData])

  return (
    <CardContent>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id='permit-select'>Select Permit</InputLabel>
            <Select
              fullWidth
              id='select-permit'
              value={permit}
              onChange={e => setPermit(e.target.value)}
              label='Select Permit'
              labelId='permit-select'
              inputProps={{ placeholder: 'Select Permit' }}
            >
              <MenuItem value=''>Select Permit</MenuItem>
              <MenuItem value='permit1'>Catch IR Nearshore</MenuItem>
              <MenuItem value='permit2'>Catch IR Offshore</MenuItem>
              <MenuItem value='permit3'>Catch Nearshore</MenuItem>
              <MenuItem value='permit4'>Catch Offshore</MenuItem>
              <MenuItem value='permit5'>Vessel License</MenuItem>
              <MenuItem value='permit6'>Transport License</MenuItem>
              <MenuItem value='permit7'>Export Live</MenuItem>
              <MenuItem value='permit8'>Export Frozen</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id='plan-select'>Select Stakeholders</InputLabel>
            <Select
              fullWidth
              id='select-plan'
              value={plan}
              onChange={e => setPlan(e.target.value)}
              label='Select Stakeholders'
              labelId='plan-select'
              inputProps={{ placeholder: 'Select Stakeholders' }}
            >
              <MenuItem value=''>Select Stakeholders</MenuItem>
              <MenuItem value='basic'>Sole Owners</MenuItem>
              <MenuItem value='company'>Companies</MenuItem>
              <MenuItem value='enterprise'>Outlets / Retailers</MenuItem>
              <MenuItem value='team'>Government officials</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id='statusapp-select'>Select Status</InputLabel>
            <Select
              fullWidth
              id='select-statusapp'
              label='Select Status'
              value={statusapplications}
              onChange={e => setStatusApplications(e.target.value)}
              labelId='statusapp-select'
              inputProps={{ placeholder: 'Select Status' }}
            >
              <MenuItem value=''>Select Status</MenuItem>
              <MenuItem value='new'>New Applications </MenuItem>
              <MenuItem value='pending'>Pending Applications </MenuItem>
              <MenuItem value='approved'>Approved Applications </MenuItem>
              <MenuItem value='denied'>Denied Applications </MenuItem>
              <MenuItem value='renewed'>Renewed Applications </MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
