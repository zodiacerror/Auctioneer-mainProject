import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './GuestStyle.css'
import axios from "axios";



const ChangePassword = () => {




    const Did = sessionStorage.getItem('dId')

    const [Password, setPassword] = useState('')
    const [newPassword, setnewPassword] = useState('')
    const [rePassword, setrePassword] = useState('')
    const [currentPassword, setcurrentPassword] = useState('')


    const fetchChangePassword = () => {
        axios.get(`http://localhost:5000/Dealer/${Did}`).then((response) => {
            console.log(response.data.dealer)
            const data = response.data.dealer
            setPassword(data.Password)

        })
    }
    const UpdateChangePasswordDealer = () => {
        if (currentPassword === Password) {
            if (newPassword === rePassword) {
                const data = {
                    Password:newPassword
                }
                axios.put(`http://localhost:5000/updateChangePasswordDealer/${Did}`, data).then((response) => {
                    console.log(response.data)
                    fetchChangePassword()
                })

            }
            else{
                alert('Re-password not match')

            }
        }
        else{
            alert('Current Password is invalid')
        }


    }

    useEffect(() => {
        fetchChangePassword()
    }, [])

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={{ p: 5, backgroundColor: 'aliceblue', width: 300, height: 350, mt: 5, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant='h4' textAlign={'center'} sx={{ p: 2 }} className='dancing-script'>Change Password</Typography>
                <Stack>
                    <TextField id="standard-basic" label="Old Password" variant="outlined" value={currentPassword} onChange={(event) => setcurrentPassword(event.target.value)} />
                </Stack>
                <Stack>
                    <TextField id="standard-basic" label="New Password" variant="outlined" value={newPassword} onChange={(event) => setnewPassword(event.target.value)} />
                </Stack>
                <Stack>
                    <TextField id="standard-basic" label="Re-Enter New Password" variant="outlined" value={rePassword} onChange={(event) => setrePassword(event.target.value)} />
                </Stack>
                <Stack direction='column' >
                    <Button variant="contained" fullWidth onClick={UpdateChangePasswordDealer}>Save</Button>
                </Stack>

            </Card>

        </Box>
    )
}

export default ChangePassword