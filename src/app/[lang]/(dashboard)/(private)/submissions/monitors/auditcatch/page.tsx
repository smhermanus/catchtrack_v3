// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import FormLayoutsAuditCatch from '@views/forms/form-layouts/FormLayoutsAuditCatch'

const FormLayouts = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h3'>Log a Catch</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormLayoutsAuditCatch />
      </Grid>
    </Grid>
  )
}

export default FormLayouts
