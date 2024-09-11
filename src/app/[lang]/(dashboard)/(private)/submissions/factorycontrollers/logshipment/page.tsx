// MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// Component Imports
import FormLayoutsLogShipment from '@views/forms/form-layouts/FormLayoutsLogShipment'

const FormLayouts = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h3'>Log a Shipment </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormLayoutsLogShipment />
      </Grid>
    </Grid>
  )
}

export default FormLayouts
