import { Avatar, Box, Button, Card, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './GuestStyle.css'
import axios from 'axios'



const MyProfile = () => {

    const Did = sessionStorage.getItem('dId')

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Contact, setContact] = useState('')

    const fetchMyProfile = () => {
        axios.get(`http://localhost:5000/Dealer/${Did}`).then((response) => {
            console.log(response.data.dealer)
            const data = response.data.dealer
            setName(data.Name)
            setEmail(data.Email)
            setContact(data.Contact)
        })
    }



    const UpdateDealer = () => {
        const data = {
            Name,
            Email,
            Contact
        }
        axios.put(`http://localhost:5000/updateDealer/${Did}`, data).then((response) => {
            console.log(response.data)
            fetchMyProfile()
        })
    }
    useEffect(() => {
        fetchMyProfile()
    }, [])

    return (
        <div>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <Card sx={{ p: 5, backgroundColor: 'aliceblue', width: 300, height: 400, mt: 5, display: 'flex', gap: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant='h4' textAlign={'center'} sx={{ p: 2 }} className='dancing-script'>Edit Profile</Typography>
                    <Stack>
                        <TextField id="standard-basic" label="Name" variant="standard" value={Name} onChange={(event) => setName(event.target.value)} />
                    </Stack>
                    <Stack>
                        <TextField id="standard-basic" label="Email" variant="standard" value={Email} onChange={(event) => setEmail(event.target.value)} />
                    </Stack>
                    <Stack>
                        <TextField id="standard-basic" label="Contact" variant="standard" value={Contact} onChange={(event) => setContact(event.target.value)} />
                    </Stack>
                    <Stack spacing={5} sx={{ mt: 3 }} direction='row'>
                        <Button sx={{ px: 5 }} variant="contained" fullWidth onClick={UpdateDealer}>Save</Button>
                    </Stack>

                </Card>
            </Box>
        </div >
    )
}

export default MyProfile