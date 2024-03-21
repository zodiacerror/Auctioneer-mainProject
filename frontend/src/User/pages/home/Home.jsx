import Stories from '../../components/stories/Stories'
import Posts from '../../components/posts/Posts'
// import Share from "../../components/share/Share"
import './home.scss'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Box, Button, Card, Typography } from '@mui/material'
import { setSocket } from '../../../Context/Context'
import { Link } from 'react-router-dom'


const Home = () => {

   const [rows, setRows] = useState(null)

   const { socket } = useContext(setSocket)
   const [countDown, setCountDown] = useState(null)
   const [check, setCheck] = useState(false)
   const [rowLot, setRowLot] = useState(null)


   useEffect(() => {
      socket.on('auctionTimerFormServer', (arg) => {
         setCountDown(arg.countdown)
      })
      socket.on('auctionButton', () =>  {
         setCheck(true)
      })
   }, [socket])

   const fetchLot = () => {
      axios
         .get('http://localhost:5000/AuctionheadCurrentDateForHome')
         .then((response) => {
            console.log(response.data.auctionhead)
            setRows(response.data.auctionhead)
         })
   }



   const fetchLotData = () => {
     axios.get('http://localhost:5000/AuctionheadForHome').then((response) => {
        console.log(response.data.auctionhead)
        setRowLot(response.data.auctionhead)
     })
  }

   useEffect(() => {
      fetchLot()
      fetchLotData()
   }, [])
   return (
      <div className='home'>
         {rows && <Stories rows={rows} />}
         <Box sx={{ display: 'flex', width: '100%' }}>
            <Card
               
               className='innerCard'
               sx={{ p: 5, m: 3, textAlign: 'center', width: '40%' ,backgroundColor:'lavender'}}
            >
               {check ? (
                  <Link  to={`../../Auction`}>
                     <Button component='label'
                     variant='contained'
                    >
                        Live Auction
                     </Button>
                  </Link>
               ) : (
                  <Typography variant='h4'>
                     Auction Start in {countDown}
                  </Typography>
               )}
            </Card>

            {/* <Share/> */}
            <Card
               className='innerCard'
               sx={{ p: 5, m: 3, textAlign: 'center', width: '40%' }}
            >
               <Typography variant='h4'>Upcoming Auction</Typography>
            </Card>
         </Box>
         {
            rowLot && <Posts rowLot={rowLot} />
         }
      </div>
   )
}

export default Home
