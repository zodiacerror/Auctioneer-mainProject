import { Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
// import LeftBar from './components/leftBar/LeftBar'
// import RightBar from './components/rightBar/RightBar'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Viewdealer from './pages/viewdealer/Viewdealer'
import './style.scss'
// import Auction from './components/Auction/Auction'
import { Box } from '@mui/material'
import {  useState } from 'react'
import Favourite from './pages/favourite/Favourite'
import EditProfile from './pages/EditProfile'
import Notification from './pages/notification/Notification'
import ViewMyLot from './pages/ViewMyLot/ViewMyLot'
import Checkout from './pages/CheckOut'
import ChangePassword from './pages/ChangePassword'



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
                  element={<Home />}
               />
               <Route
                  path='/Profile'
                  element={<Profile />}
               />
               <Route
                  path='/Viewdealer'
                  element={<Viewdealer />}
               />
                <Route
                  path='/EditProfile'
                  element={<EditProfile />}
               />
               <Route
                  path='/ChangePassword'
                  element={<ChangePassword />}
               />
               <Route
                  path='/checkout/:Id'
                  element={<Checkout />}
               />
               <Route
                  path='/ViewMyLot'
                  element={<ViewMyLot />}
               />
            </Routes>
            {/* </div> */}
            {/* <RightBar /> */}
         </div>
      </Box>
   )
}

export default App
