import Stories from '../../Component/stories/Stories'
import Posts from '../../Component/posts/Posts'
// import Share from "../../components/share/Share"
import './home.scss'
import {  useState } from 'react'
import { Box } from '@mui/material'


const Home = () => {


 
   return (
      <div className='home'>
        <Stories  />
         <Box sx={{ display: 'flex', width: '100%' }}>
            
      <Posts  />
         </Box>
      </div>
   )
}

export default Home
