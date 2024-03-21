import React from 'react'
import '../GuestStyle.css'
import { Box, Card, Stack, Typography } from '@mui/material'


const Notification = () => {
  return (
    <Box sx={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center',flexDirection:'column', gap:5}}>
        <Box sx={{width:800}}> 
            <Typography variant='h4' textAlign={'center'} sx={{ p: 2 }} className='dancing-script'>Notifications</Typography>
        </Box> 
        <Box sx={{width:800,display:'flex', alignItems:'center',justifyContent:'cenyter',flexDirection:'coloumn'}}>
            <Card sx={{width:700,height:50,bgcolor:'aliceblue',display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
                <Stack>
                    <Typography>date</Typography>
                </Stack>
                <Stack>
                    <Typography>content</Typography>
                </Stack>
                <Stack>
                    <Typography>new</Typography>
                </Stack>
            </Card>
        </Box>       
    </Box>
    )
}

export default Notification