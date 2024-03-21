import {
   Avatar,
   Box,
   Button,
   Card,
   FormControl,
   InputLabel,
   MenuItem,
   Select,
   Stack,
   TextField,
   Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styled from '@emotion/styled'
import './GuestStyle.css'

const VisuallyHiddenInput = styled('input')({
   clip: 'rect(0 0 0 0)',
   clipPath: 'inset(50%)',
   height: 1,
   overflow: 'hidden',
   position: 'absolute',
   bottom: 0,
   left: 0,
   whiteSpace: 'nowrap',
   width: 1,
})

const Registration = () => {
   const [Name, setName] = useState('')
   const [Email, setEmail] = useState('')
   const [Password, setPassword] = useState('')
   const [Contact, setContact] = useState('')
   const [Proof, setProof] = useState(null)
   const [Photo, setPhoto] = useState(null)
   const [District, setDistrict] = useState('')
   const [Place, setPlace] = useState('')
   const [PhotoURL, setPhotoURL] = useState('') 

   const [State, setState] = useState('')
   const [stateData, setStateData] = useState([])
   const [districtData, setDistrictData] = useState([])
   const [placeData, setPlaceData] = useState([])

   const handleSubmit = (event) => {
      event.preventDefault()
      const frm = new FormData()
      frm.append('Name', Name)
      frm.append('Email', Email)
      frm.append('Password', Password)
      frm.append('Contact', Contact)
      frm.append('Proof', Proof)
      frm.append('Photo', Photo)
      frm.append('Place', Place)

      axios.post('http://localhost:5000/User', frm).then((response) => {
         console.log(response.data)
         setName('')
         setEmail('')
         setPassword('')
         setContact('')
         setProof('')
         setPhoto('')
         setDistrict('')
         setPlace('')
      })
   }

   const fetchState = () => {
      axios.get('http://localhost:5000/State').then((response) => {
         console.log(response.data.state)
         setStateData(response.data.state)
      })
   }

   const fetchDistrict = (Id) => {
      setState(Id)
      axios.get(`http://localhost:5000/District/${Id}`).then((response) => {
         console.log(response.data.district)
         setDistrictData(response.data.district)
      })
   }

   const fetchPlace = (Id) => {
      setDistrict(Id)
      axios.get(`http://localhost:5000/Place/${Id}`).then((response) => {
         console.log(response.data.place)
         setPlaceData(response.data.place)
      })
   }

      // Function to handle file selection for photo
      const handlePhotoChange = (event) => {
         const file = event.target.files[0]
         setPhoto(file)
         setPhotoURL(URL.createObjectURL(file)) // Generate URL for the selected image file
      }

   useEffect(() => {
      fetchState()
   }, [])

   return (
      <div>
         <Box
            sx={{
               width: '100%',
               height: '100vh',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}
            component={'form'}
            onSubmit={handleSubmit}
         >
            <Card sx={{ p: 5, backgroundColor: 'aliceblue', }}>
               <Typography variant='h4' textAlign={'center'} sx={{ p: 2 }} className='dancing-script'>Auctioneer</Typography>
               <Box sx={{display:'flex',gap:5}}>

                  <Box sx={{width:400,display:'flex',flexDirection:'column',alignItems:'center'}}>
                     <Avatar src={PhotoURL} sx={{width:300, height:300}}/>
                     <Typography textAlign={'center'} sx={{mt:5}} variant='h5'>{Name}</Typography>

                     
                  </Box>
                  <Box>

                     <Stack
                        direction={'row'}
                        sx={{ mt: 1 }}
                        gap={4}
                     >
                        <TextField
                           id='standard-basic'
                           label='Name'
                           variant='standard'
                           onChange={(event) => setName(event.target.value)}
                           value={Name}
                           fullWidth
                        />

                        <TextField
                           id='standard-basic'
                           label='Email'
                           variant='standard'
                           onChange={(event) => setEmail(event.target.value)}
                           value={Email}
                           fullWidth
                        />
                     </Stack>
                     <Stack>
                        <Button
                           sx={{ mt: 3 }}
                           component='label'
                           variant='contained'
                           startIcon={<CloudUploadIcon />}
                        >
                           Upload Photo
                           <VisuallyHiddenInput
                              type='file'
                              onChange={handlePhotoChange}
                           />
                        </Button>
                     </Stack>
                     <Stack
                        sx={{ mt: 1 }}
                        direction={'row'}
                        gap={4}
                     >
                        <TextField
                           id='standard-basic'
                           label='Contact'
                           variant='standard'
                           onChange={(event) => setContact(event.target.value)}
                           value={Contact}
                           fullWidth
                        />

                        <TextField
                           id='standard-basic'
                           label='Password'
                           variant='standard'
                           onChange={(event) => setPassword(event.target.value)}
                           value={Password}
                           fullWidth
                        />
                     </Stack>
                     <Stack sx={{ mt: 3 }}>
                        <Button
                           component='label'
                           variant='contained'
                           startIcon={<CloudUploadIcon />}
                        >
                           Upload Proof
                           <VisuallyHiddenInput
                              type='file'
                              onChange={(event) => setProof(event.target.files[0])}
                           />
                        </Button>
                     </Stack>

                     <Stack
                        sx={{ mt: 2 }}
                        direction='row'
                        gap={4}
                     >
                        <FormControl
                           variant='standard'
                           sx={{ m: 1, minWidth: 140 }}
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
                              value={State}
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

                        <FormControl
                           variant='standard'
                           sx={{ m: 1, minWidth: 120 }}
                           fullWidth
                        >
                           <InputLabel id='demo-simple-select-standard-label'>
                              District
                           </InputLabel>
                           <Select
                              labelId='demo-simple-select-standard-label'
                              id='demo-simple-select-standard'
                              label='District'
                              onChange={(event) => fetchPlace(event.target.value)}
                              value={District}
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
                        <FormControl
                           variant='standard'
                           sx={{ m: 1, minWidth: 120 }}
                           fullWidth
                        >
                           <InputLabel id='demo-simple-select-standard-label'>
                              Place
                           </InputLabel>
                           <Select
                              labelId='demo-simple-select-standard-label'
                              id='demo-simple-select-standard'
                              label='Place'
                              onChange={(event) => setPlace(event.target.value)}
                              value={Place}
                           >
                              {placeData.map((place, key) => (
                                 <MenuItem
                                    key={key}
                                    value={place._id}
                                 >
                                    {place.placeName}
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
                        <Button
                           sx={{ px: 5 }}
                           type='submit'
                           variant='contained'
                           fullWidth
                        >
                           Submit
                        </Button>
                     </Stack>
                  </Box>
               </Box>

            </Card>
         </Box>
      </div>
   )
}

export default Registration
