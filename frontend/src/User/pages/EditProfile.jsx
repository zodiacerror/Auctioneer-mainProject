import { Avatar, Box, Button, Card, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './GuestStyle.css'
import axios from 'axios'



const MyProfile = () => {

    const Uid = sessionStorage.getItem('uId')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')

    const fetchMyProfile = () => {
        axios.get(`http://localhost:5000/User/${Uid}`).then((response) => {
            console.log(response.data.user)
            const data = response.data.user
            setName(data.name)
            setEmail(data.email)
            setContact(data.contact)
        })
    }



    const UpdateUser = () => {
        const data = {
            name,
            email,
            contact
        }
        axios.put(`http://localhost:5000/updateUser/${Uid}`, data).then((response) => {
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
                        <TextField id="standard-basic" label="Name" variant="standard" value={name} onChange={(event) => setName(event.target.value)} />
                    </Stack>
                    <Stack>
                        <TextField id="standard-basic" label="Email" variant="standard" value={email} onChange={(event) => setEmail(event.target.value)} />
                    </Stack>
                    <Stack>
                        <TextField id="standard-basic" label="Contact" variant="standard" value={contact} onChange={(event) => setContact(event.target.value)} />
                    </Stack>
                    <Stack spacing={5} sx={{ mt: 3 }} direction='row'>
                        <Button sx={{ px: 5 }} variant="contained" fullWidth onClick={UpdateUser}>Save</Button>
                    </Stack>

                </Card>
            </Box>
        </div >
    )
}

export default MyProfile