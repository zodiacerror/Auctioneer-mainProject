

import { Route, Routes } from 'react-router-dom'
import Navbar from './Component/navbar/Navbar'
// import LeftBar from './components/leftBar/LeftBar'
// import RightBar from './components/rightBar/RightBar'
import Profile from './Pages/profile/Profile'
import MyProfile from './Pages/MyProfile';
import AddLot from './Pages/AddLot';
import './style.scss'
// import Auction from './components/Auction/Auction'
import { Box } from '@mui/material'
import { useState } from 'react'
import ChangePassword from './Pages/ChangePassword';
import EditProfile from './Pages/EditProfile';
import ViewLot from './Pages/ViewLot';



const myStyle = {
    height: '100vh',
    overflowY: 'scroll',
    WebkitOverflowScrolling: 'touch', // For smoother scrolling on iOS devices

    /* Customize the scrollbar */
    scrollbarWidth: 'thin', // Firefox
    scrollbarColor: '#888 #f1f1f1', // Firefox

    '&::-webkit-scrollbar': {
        width: '0px', // Set the width of the scrollbar
    },

    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'white', // Set the color of the scrollbar thumb
        borderRadius: '4px', // Set the border radius of the thumb
    },

    '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1', // Set the color of the scrollbar track
    },

    /* Make the scrollbar visible when scrolling */
    '&:hover::-webkit-scrollbar-thumb': {
        backgroundColor: '#cfbbbb', // Change the color on hover
    },
}

const App = () => {
    const [color, setColor] = useState(true)



    return (
        // <Routes>
        //   <Route path="/Auction" element={<Auction/>} />
        // </Routes>
        <Box
            className={`theme-${color ? 'light' : 'dark'}`}
            sx={myStyle}
        >
            <Navbar
                setColor={setColor}
                color={color}
            />
            {/* <div style={{ display: "flex" }}>
          <LeftBar /> */}
            <div style={{ flex: 8 }}>
                <Routes>
                    <Route
                        path='/'
                        element={<Profile />}
                    />

                    <Route path='/MyProfile' element={<MyProfile />} />
                    <Route path='/EditProfile' element={<EditProfile />} />
                    <Route path='/Changepassword' element={<ChangePassword />} />

                    <Route path='/AddLot' element={<AddLot />} />
                    <Route path='/ViewLot' element={<ViewLot />} />
                </Routes>
                {/* </div> */}
                {/* <RightBar /> */}
            </div>
        </Box>
    )
}

export default App
