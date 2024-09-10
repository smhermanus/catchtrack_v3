// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Type Imports
import type { UsersType } from '@/types/apps/userTypes'

// Component Imports
import PermitCards from './PermitCards'
import PermitTable from './PermitTable'

const Permits = ({ userData }: { userData?: UsersType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' className='mbe-1'>
          Permits List
        </Typography>
        <Typography>A permit give permission to catch fish and distribute for selling purposes.</Typography>
      </Grid>
      <Grid item xs={12}>
        <PermitCards />
      </Grid>
      <Grid item xs={12} className='!pbs-12'>
        <Typography variant='h4' className='mbe-1'>
          Total users with their permits
        </Typography>
        <Typography>Find all of your company&#39;s administrator accounts and their associate permits.</Typography>
      </Grid>
      <Grid item xs={12}>
        <PermitTable tableData={userData} />
      </Grid>
    </Grid>
  )
}

export default Permits
