// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import FormLayoutsPermit from '@views/forms/form-layouts/FormLayoutsPermit'

const FormLayouts = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h3'>Permit Application</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormLayoutsPermit />
      </Grid>
    </Grid>
  )
}

export default FormLayouts
