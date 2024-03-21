import React, { useState } from 'react'
import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
const State = () => {
   const [stateName, setStateName] = useState('')

   const handleSubmit = (event) => {
      event.preventDefault()
      const data = {
         stateName,
         
      }
      axios.post('http://localhost:5000/State', data).then((response) => {
         console.log(response.data)
         setStateName('')
      })
   }
   return (
      <Box
         sx={{
            width: '100%',
            height: '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
         }}
         component={'form'}
         onSubmit={handleSubmit}
      >
         <Card sx={{ p: 5, backgroundColor: 'lightblue' }}>
            <Typography variant='h5'>State</Typography>
            <Stack
               spacing={5}
               sx={{ mt: 3 }}
               direction='row'
            >
               <TextField
                  id='standard-basic'
                  label='Place'
                  value={stateName}
                  variant='standard'
                  onChange={(event) => setStateName(event.target.value)}
               />
               <Button
                  sx={{ px: 5 }}
                  variant='contained'
                  type='submit'
               >
                  Save
               </Button>
            </Stack>
         </Card>
      </Box>
   )
}
export default State
