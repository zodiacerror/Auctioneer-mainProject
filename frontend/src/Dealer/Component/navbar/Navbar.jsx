import './navbar.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { Link } from 'react-router-dom'
import { Avatar, Box, Button, Card, IconButton, Popover, Popper, Typography } from '@mui/material'
import { useState } from 'react'

const Navbar = ({ setColor, color }) => {

   const [anchorEl, setAnchorEl] = useState(null);

   const handleClick = (event) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
   };

   const open = Boolean(anchorEl);
   const id = open ? 'simple-popper' : undefined;


   console.log(color)
   return (
      <div className='navbar'>
         <div className='left'>
            <Link
               className='Link'
               to='/'
               style={{ textDecoration: 'none' }}
            >
               <Typography
                  variant='h4'
                  textAlign={'center'}
                  sx={{ p: 2 }}
                  className='dancing-script'
               >
                  Auctioneer
               </Typography>
            </Link>
            <Link to='/Dealer/'
               className='Link'

               style={{ textDecoration: 'none' }}
            >
               <HomeOutlinedIcon />
            </Link>
            {color ? (
               <DarkModeIcon onClick={() => setColor(!color)} />
            ) : (
               <LightModeIcon onClick={() => setColor(!color)} />
            )}
         </div>
         <div className='right'>

            <NotificationsOutlinedIcon />
            <div className='user'>
               <IconButton aria-describedby={id} type="button" onClick={handleClick}>

                  <Avatar
                  />
               </IconButton>
               <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClick}
                  anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'left',
                  }}
               >
                  <Box sx={{ m: 2, width: 180, height: 215, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                  <Link to={'/Dealer/EditProfile'}>
                     <Button sx={{ width: '100%' }}> Edit Profile</Button>
                     </Link>
                     <Link to={'/Dealer/Changepassword'}>
                     <Button sx={{ width: '100%' }}>Change Password</Button>
                     </Link>
                     <Link to={'/Dealer/EditProfile'}>
                        <Button sx={{ width: '100%' }}>My Winnings</Button>
                     </Link>
                     <Button variant='outlined' sx={{ width: '100%' }}>LogOut</Button>
                  </Box>
               </Popover>
               {/* <span>{currentUser.name}</span> */}
            </div>
         </div>
      </div>
   )
}

export default Navbar
