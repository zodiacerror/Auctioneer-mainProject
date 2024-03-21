import React, { useEffect, useState } from 'react'
import { Box, Button, Card, Stack, TextField, Typography } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import axios from 'axios'

const District = () => {
   const [stateId, setStateId] = useState('')
   const [districtName, setDistrictName] = useState('')
   const [stateData, setStateData] = useState([])

   const handleSubmit = (event) => {
      event.preventDefault()
      const data = {
         stateId,
         districtName,
      }
      axios.post('http://localhost:5000/District', data).then((response) => {
         console.log(response.data)
         setStateId('')
         setDistrictName('')
      })
   }

   const fetchState = () => {
      axios.get('http://localhost:5000/State').then((response) => {
         console.log(response.data.state)
         setStateData(response.data.state)
      })
   }

   useEffect(() => {
      fetchState()
   }, [])
   
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
         <Card sx={{ p: 5, backgroundColor: 'aliceblue' }}>
            <Typography variant='h5'>District</Typography>
            <Stack
               spacing={5}
               sx={{ mt: 3 }}
               direction='row'
            >
               <FormControl
                  variant='standard'
                  fullWidth
               >
                  <InputLabel id='demo-simple-select-standard-label'>
                     State
                  </InputLabel>
                  <Select
                     labelId='demo-simple-select-standard-label'
                     id='demo-simple-select-standard'
                     label='State'
                     onChange={(event) => setStateId(event.target.value)}
                     value={stateId}
                  >
                     {stateData.map((state, key) => (
                        <MenuItem
                           key={key}
                           value={state._id}
                        >
                           {state.stateName}
                        </MenuItem>
                     ))}
                  </Select>
               </FormControl>
            </Stack>

            <Stack
               spacing={5}
               sx={{ mt: 3 }}
               direction='row'
            >
               <TextField
                  id='standard-basic'
                  label='District'
                  variant='standard'
                  onChange={(event) => setDistrictName(event.target.value)}
                  value={districtName}
               />
               <Button
                  sx={{ px: 5}}
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

export default District
