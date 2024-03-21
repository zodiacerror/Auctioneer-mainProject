import {
   Avatar,
   Box,
   Button,
   Card,
   Stack,
   TextField,
   Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
// import { Link } from 'react-router-dom'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import styled from '@emotion/styled'

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

const AddLot = () => {
   const [Name, setName] = useState('')
   const [Price, setPrice] = useState('')
   const [Details, setDetails] = useState('')

   const [ProductImg, setProductImg] = useState([])
   const [rows, setRows] = useState([])
   const [PhotoURL, setPhotoURL] = useState('')
   const Did = sessionStorage.getItem('dId')

   const rowsWithId = rows.map((row, index) => ({ ...row, id: index + 1 }))
   const columns = [
      { field: '_id', headerName: 'ID', flex: 3 },

      {
         field: 'name',
         headerName: 'Name',
         flex: 3,
      },

      {
         field: 'Action',
         headerName: 'Action',

         flex: 4,
         renderCell: (params) => {
            return (
               <Box sx={{ display: 'flex', gap: 3 }}>
                  <Button
                     variant='outlined'
                     sx={{ color: 'red', borderColor: 'red' }}
                  >
                     Delete
                  </Button>
               </Box>
            )
         },
      },
   ]

   const fetchLot = () => {
      axios.get(`http://localhost:5000/Lot/${Did}`).then((response) => {
         console.log(response.data.lot)
         setRows(response.data.lot)
      })
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      const frm = new FormData()
      frm.append('name', Name)
      frm.append('price', Price)
      frm.append('details', Details)
      frm.append('dealerId', sessionStorage.getItem('dId'))

      // Append each file to the FormData object
      for (let i = 0; i < ProductImg.length; i++) {
         frm.append('productImg', ProductImg[i])
      }

      axios.post('http://localhost:5000/Lot', frm).then((response) => {
         console.log(response.data)
         setName('')
         setPrice('')
         setDetails('')
         setPhotoURL('')
         fetchLot()
      })
   }

   const handlePhotoChange = (event) => {
      const file = event.target.files
      if (file.length + ProductImg.length > 6) {
         // If so, alert the user
         alert('You can only upload up to 6 files.')
         return // Exit the function
      }
      setProductImg(event.target.files)
      setPhotoURL(URL.createObjectURL(file[0]))
   }

   useEffect(() => {
      fetchLot()
   }, [])
   return (
      <Box
         sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
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
            <Card sx={{ p: 5, backgroundColor: 'aliceblue', width: 900 }}>
               <Typography
                  variant='h4'
                  textAlign={'center'}
                  sx={{ p: 2, marginBottom: 5 }}
                  className='dancing-script'
               >
                  Auctioneer
               </Typography>
               <Box sx={{ display: 'flex', gap: 10 }}>
                  <Box
                     sx={{
                        width: 300,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                     }}
                  >
                     <Avatar
                        src={PhotoURL}
                        sx={{ width: 300, height: 300 }}
                        variant='square'
                     />
                     <Typography
                        textAlign={'center'}
                        sx={{ mt: 3, height: 30 }}
                        variant='h5'
                     >
                        {Name}
                     </Typography>
                  </Box>
                  <Box sx={{ width: 600 }}>
                     <Stack
                        spacing={3}
                        sx={{ backgroundColor: 'aliceblue' }}
                     >
                        <TextField
                           id='standard-basic'
                           label='Name'
                           variant='standard'
                           value={Name}
                           fullWidth
                           onChange={(event) => setName(event.target.value)}
                        />
                     </Stack>
                     <Stack
                        spacing={4}
                        sx={{ backgroundColor: 'aliceblue', mt: 4 }}
                     >
                        <TextField
                           id='standard-basic'
                           label='Details'
                           multiline
                           maxRows={3}
                           variant='standard'
                           value={Details}
                           onChange={(event) => setDetails(event.target.value)}
                        />
                     </Stack>
                     <Stack
                        spacing={3}
                        sx={{ backgroundColor: 'aliceblue', mt: 4 }}
                     >
                        <TextField
                           id='standard-basic'
                           label='Price'
                           variant='standard'
                           type='number'
                           value={Price}
                           onChange={(event) => setPrice(event.target.value)}
                        />
                     </Stack>
                     <Stack
                        spacing={3}
                        sx={{ backgroundColor: 'lightblue', mt: 4 }}
                     >
                        <Button
                           component='label'
                           variant='contained'
                           startIcon={<CloudUploadIcon />}
                        >
                           Upload file
                           <VisuallyHiddenInput
                              type='file'
                              multiple
                              onChange={handlePhotoChange}
                           />
                        </Button>
                     </Stack>

                     <Stack
                        spacing={3}
                        sx={{ mt: 4 }}
                     >
                        <Button
                           sx={{ px: 4, mt: 10, ml: 5 }}
                           type='submit'
                           variant='outlined'
                        >
                           Submit
                        </Button>
                     </Stack>
                  </Box>
               </Box>
            </Card>
         </Box>
         <Box sx={{ height: 400, width: '80%', mt: 6 }}>
            <DataGrid
               rows={rowsWithId}
               columns={columns}
               initialState={{
                  pagination: {
                     paginationModel: {
                        pageSize: 5,
                     },
                  },
               }}
               pageSizeOptions={[5]}
               checkboxSelection
               disableRowSelectionOnClick
            />
         </Box>
      </Box>
   )
}

export default AddLot
