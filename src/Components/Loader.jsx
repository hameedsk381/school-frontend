import { Box } from '@mui/material'
import React from 'react'

const Loader = () => {
  return (
    <Box
       component="img"
       src={'loader.svg'}
       href="/"
       sx={{
         m: 'auto',
         width: { xs: "15%", md: "20%" },
       }}
     />
  )
}

export default Loader