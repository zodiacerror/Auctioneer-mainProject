import {
   Box,
   Button,
   Card,
 
   Stack,
   TextField,
   Typography,
} from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AssignAuction = () => {
    const {id} = useParams()
   const [minDate, setMinDate] = useState('')
   const [date,setDate] = useState('')
   const [price,setPrice] = useState('')

   const handleSubmit = (event) => {
    event.preventDefault()
    const data = {
       date,
       lotId:id,
       price
    }
    axios.post('http://localhost:5000/Auctionhead', data).then((response) => {
       console.log(response.data)
       setDate('')
    })
 }


   const getCurrentDate = () => {
      const today = new Date()
      const dd = String(today.getDate()).padStart(2, '0')
      const mm = String(today.getMonth() + 1).padStart(2, '0') // January is 0!
      const yyyy = today.getFullYear()
      return `${yyyy}-${mm}-${dd}`
   }

   useEffect(() => {
      setMinDate(getCurrentDate())
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
         <Card sx={{ p: 5, backgroundColor: 'lightblue',width:'30vw' }}>
            <Typography variant='h5'>District</Typography>

            <Stack
               spacing={5}
               sx={{ mt: 3 }}
               direction='column'
            >
               <TextField
                  id='standard-basic'
                  variant='standard'
                  type='date'
                  inputProps={{
                     min: minDate, // Set min date to the current date
                  }}
                  onChange={(event) => setDate(event.target.value)}
                  value={date}
               />
                 <TextField
                  id='standard-basic'
                  variant='standard'
                  label="Price"
                  onChange={(event) => setPrice(event.target.value)}
                  value={price}
               />

               <Stack
                  spacing={5}
                  sx={{ mt: 3 }}
                  direction='row'
               >
                

                  <Button
                     sx={{ px: 5 }}
                     variant='contained'
                     type='submit'
                     fullWidth
                  >
                     Save
                  </Button>
               </Stack>
            </Stack>
         </Card>
      </Box>
   )
}

export default AssignAuction
