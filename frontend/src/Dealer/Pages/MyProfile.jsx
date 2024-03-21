import { Avatar, Box, Card, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import './GuestStyle.css'



const MyProfile = () => {

    return (
        <div>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <Card sx={{ p: 5, backgroundColor: 'aliceblue', width: 300, height: 400, mt: 5,gap:3, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant='h4' textAlign={'center'} sx={{ p: 2 }} className='dancing-script'>My Profile</Typography>
                    <Avatar sx={{ width: 150, height: 150, }}></Avatar>
                    <Stack>
                        <Typography >Anas</Typography>
                    </Stack>
                    <Stack>
                    <Typography >Anas</Typography>
                    </Stack>
                    <Stack>
                    <Typography >Anas</Typography>
                    </Stack>

                </Card>
            </Box>
        </div >
    )
}

export default MyProfile