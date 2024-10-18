// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import FormLayoutsLogCatch from '@views/forms/form-layouts/FormLayoutsLogCatch'

const FormLayouts = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h3'>Notify Rights Holder</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormLayoutsLogCatch />
      </Grid>
    </Grid>
  )
}

export default FormLayouts
