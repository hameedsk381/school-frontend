import { Grid, } from '@mui/material'
import React from 'react'
import Alumniform from './Alumniform'
import ImageUploader from './ImageUploader'

const Admin = () => {
  return (
<Grid container spacing={2} p={3}>
<Grid item xs={3}>
<ImageUploader/>
</Grid>
<Grid item xs={3}>
<Alumniform/>
</Grid>
<Grid item xs={3}>

</Grid>
<Grid item xs={3}>

</Grid>
<Grid item xs={3}>

</Grid>
<Grid item xs={4}>

</Grid>
<Grid item xs={4}>

</Grid>
</Grid>
  )
}

export default Admin