import { Link } from 'react-router-dom'
import './post.scss'

import { Box, Button, CardMedia, Typography } from '@mui/material'
import Carousel from "react-material-ui-carousel";

const Post = ({ post }) => {
   return (
      <div className='postDealer'>
         <div className='container'>
            <div className='user'>
               <div className='userInfo'>
                  {/* <img
                     src={post.dealerProfile}
                     alt=''
                  /> */}
                  <div className='details'>
                     {/* <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              > */}
                     <Typography className='name'>{post.name}</Typography>
                     {/* </Link> */}
                  </div>
               </div>
               {/* <MoreHorizIcon /> */}
               <Link
                     to={`/profile/${post.userId}`}
                     style={{ textDecoration: 'none', color: 'inherit' }}
                  >
               </Link>
            </div>
            <div className='content'>
               <Carousel
                  height={'400px'}
                  stopAutoPlayOnHover={true}
                  autoPlay={false}
               >
                  {post.galleries.map((post, key) => (
                     <Box key={key}>
                        {post.Type === 'image' ? (
                           <CardMedia
                              component='img'
                              height='100%'
                              width='20%'
                              image={post.lotImgsrc}
                              alt='Image'
                           />
                        ) : (
                           <video
                              controls // Adding controls attribute for playback control
                              autoplay // Adding autoplay attribute for automatic playback
                              muted // Adding muted attribute to mute the video by default
                              width='100%' // Setting width to 100% of the container
                              height='500px' // Setting height to auto to maintain aspect ratio
                           >
                              <source
                                 src={post.lotImgsrc}
                                 type='video/mp4'
                              />
                           </video>
                        )}
                     </Box>
                  ))}
               </Carousel>
            </div>
            <div className='info'>
               <div className='item'>
                 <Typography sx={{fontSize:16}}>

                     {post.details}
                 </Typography>
                  
               </div>
            </div>
         </div>
      </div>
   )
}

export default Post
