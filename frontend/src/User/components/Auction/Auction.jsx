import { Avatar, Box, Button, Card, CardMedia, Stack, Typography } from '@mui/material'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { setSocket } from '../../../Context/Context'
import { useNavigate } from 'react-router-dom'

const Auction = () => {
   const { socket } = useContext(setSocket)
   const uid = sessionStorage.getItem('uId')
   const navigate = useNavigate()

   const [rows, setRows] = useState(null)
   const [rowLot, setRowLot] = useState(null)
   const [count, setCount] = useState(10)
   const [pricedata, setPricedata] = useState(0)
   const [notification, setNotification] = useState([])
   const fetchLot = () => {
      axios
         .get('http://localhost:5000/AuctionheadCurrentDate')
         .then((response) => {
            setRowLot(response.data.auctionhead)
         })
   }

   const fetchSingleLot = () => {
      axios
         .get(`http://localhost:5000/SingleAuctionheadCurrentDate/${uid}`)
         .then((response) => {
            const check = response.data.auctionheadWondata
            const data = response.data.auctionhead
            console.log(data)
            if (data === null) {
               alert('Auction Ended Next Auction comming soon......')
               if (check)
                  navigate('/User/ViewMyLot')
               else {
                  navigate('/User')
               }
            } else {
               setRows(response.data.auctionhead)
               setPricedata(data.price)
            }

         })
   }

   const countDown = (price, Id) => {
      socket.emit('smallCountDownFromClient', { price, Id, uid })
   }

   useEffect(() => {
      fetchSingleLot()
      fetchLot()
   }, [])

   useEffect(() => {
      socket.on('smallCountDownFromServer', ({ count, pricedata, Userid }) => {
         setCount(count)
         if (count === 10) {
            setNotification((prevState) => {
               // Check if prevState has 10 values
               if (prevState.length === 10) {
                  // If prevState has 10 values, remove the first one
                  prevState = prevState.slice(1)
               }
               // Add pricedata to the end of prevState
               return [...prevState, pricedata]
            })
         }

         if (count === 0) {
            setNotification([])
            if (Userid === uid) {
               alert('You Won This Lot')
               fetchSingleLot()
               fetchLot()
            } else {
               alert('Better Luck Next Time')
               fetchSingleLot()
               fetchLot()
            }
         }
         setPricedata(pricedata)
      })
   }, [socket])
   return (
      <Box
         sx={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            margin: 'auto',
         }}
      >
         <Box sx={{ width: '30%' }}>
            <Card sx={{ m: 2, height: '93vh' }}>
               <Typography
                  variant='h5'
                  textAlign={'center'}
                  sx={{ m: 3 }}
               >
                  Live Price
               </Typography>
               <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
                  {notification &&
                     notification.map((notify, key) => (
                        <Card
                           sx={{
                              p: 2,
                              m: 1,
                              transition: 'opacity 0.5s ease-out',
                           }}
                        >
                           <Typography key={key}> {notify} </Typography>
                        </Card>
                     ))}
               </Box>
            </Card>
         </Box>
         <Box sx={{ width: '40%' }}>
            {rows && (
               <Card
                  sx={{
                     height: '40vh',
                     minHeight: '250px',
                     m: 2,
                  }}
               >
                  <Box sx={{ width: '100%', m: 5, display: 'flex' }}>
                     <CardMedia
                        image={rows && rows.galleries[0].lotImgsrc}
                        sx={{
                           width: 200,
                           height: 200,
                           borderRadius: '50%',
                           objectFit: 'cover',
                           border: 1,
                        }}
                     />
                     <Box sx={{ m: 4 }}>
                        <Typography>{rows && rows.name}</Typography>
                        <Typography>{rows && rows.price}</Typography>
                     </Box>
                  </Box>
               </Card>
            )}

            <Card
               sx={{
                  height: '50vh',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  m: 2,
               }}
            >
               <Stack
                  direction={'column'}
                  gap={3}
                  sx={{ m: 3 }}
               >
                  <Box>
                     <Typography>Current Price : {pricedata}</Typography>
                  </Box>
                  <Stack
                     direction={'row'}
                     gap={2}
                  >
                     <Button
                        variant='contained'
                        onClick={() => countDown(50, rows._id)}
                        sx={{ p: 4, fontSize: 20 }}
                     >
                        +50
                     </Button>
                     <Button
                        variant='contained'
                        onClick={() => countDown(100, rows._id)}
                        sx={{ p: 4, fontSize: 20 }}
                     >
                        +100
                     </Button>
                     <Button
                        variant='contained'
                        onClick={() => countDown(200, rows._id)}
                        sx={{ p: 4, fontSize: 20 }}
                     >
                        +200
                     </Button>
                  </Stack>
               </Stack>
               <Box
                  sx={{
                     height: '100%',
                     width: '100%',
                     display: 'flex',
                     justifyContent: 'flex-end',
                  }}
               >
                  <Card
                     sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'lightblue',
                        alignItems: 'center',
                        m: 3,
                     }}
                  >
                     <Typography variant='h5'>{count}</Typography>
                  </Card>
               </Box>
            </Card>
         </Box>
         <Box sx={{ width: '30%' }}>
            <Card sx={{ m: 2, backgroundColor: '#008080' }}>
               <Typography variant={'h5'} textAlign={'center'} color={'white'} sx={{ m: 2 }}>UpComing</Typography>
               {rowLot &&
                  rowLot.map((lotdata, key) => (
                     <Card sx={{ display: 'flex', backgroundColor: '#ABAB5', gap: 2, p: 3, m: 1 }}>
                        <Avatar src={lotdata.galleries[0].lotImgsrc} />
                        <Typography key={key}>{lotdata.name}</Typography>
                     </Card>
                  ))}
            </Card>
         </Box>
      </Box>
   )
}

export default Auction
