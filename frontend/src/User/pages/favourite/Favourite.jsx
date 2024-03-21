import { Avatar, Box, Card, Typography } from '@mui/material'
import React from 'react'
import '../GuestStyle.css'

const Favourite = () => {
    return (
        <Box sx={{ width:'100%',}}> 
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Typography variant='h4' textAlign={'center'} sx={{ p: 2 }} className='dancing-script'>Favourites</Typography>
            </Box>
            <Box sx={{p:5}}>
                <Card sx={{width:300, height: 300, display:'flex',gap:2, justifyContent:'center',flexDirection:'column', bgcolor:'aliceblue'}}>
                    <Typography sx={{ml:2}}>Post Name</Typography>
                    <Avatar
                            src=""
                            sx={{ width: 300, height: 200 }}
                            variant='square'
                        />
                    <Typography sx={{ml:2}}>CAPTION</Typography>
                </Card>
            </Box>

        </Box>

  )
}

export default Favourite