import React, { useEffect, useState } from 'react'
import {
   Box,
   Button,
   Card,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   Stack,
   TextField,
} from '@mui/material'
import { Typography } from '@mui/material'
import axios from 'axios'

const Place = () => {
   const [stateId, setStateId] = useState('')
   const [districtId, setDistrictId] = useState('')
   const [placeName, setPlaceName] = useState('')
   const [stateData, setStateData] = useState([])
   const [districtData, setDistrictData] = useState([])

   const handleSubmit = (event) => {
      event.preventDefault()
      const data = {
         districtId,
         placeName
      }
      axios.post('http://localhost:5000/Place', data).then((response) => {
         console.log(response.data)
         setStateId('')
         setDistrictId('')
         setPlaceName('')
      })
   }

   const fetchState = () => {
      axios.get('http://localhost:5000/State').then((response) => {
         console.log(response.data.state)
         setStateData(response.data.state)
      })
   }

   const fetchDistrict = (Id) => {
      setStateId(Id)
    axios.get(`http://localhost:5000/District/${Id}`).then((response) => {
       console.log(response.data.district)
       setDistrictData(response.data.district)
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
         <Card sx={{ p: 5, backgroundColor: 'lightblue' }}>
            <Typography variant='h5'>Place</Typography>
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
                     onChange={(event) => fetchDistrict(event.target.value)}
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
               <FormControl
                  variant='standard'
                 fullWidth
               >
                  <InputLabel id='demo-simple-select-standard-label'>
                     District
                  </InputLabel>
                  <Select
                     labelId='demo-simple-select-standard-label'
                     id='demo-simple-select-standard'
                     label='District'
                     onChange={(event) => setDistrictId(event.target.value)}
                     value={districtId}
                  >
                       {districtData.map((district, key) => (
                        <MenuItem
                           key={key}
                           value={district._id}
                        >
                           {district.districtName}
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
                  label='Place'
                  variant='standard'
                  onChange={(event) => setPlaceName(event.target.value)}
                  value={placeName}
                  
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

export default Place
