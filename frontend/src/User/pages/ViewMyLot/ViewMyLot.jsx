import { Box, Button, Card, CardMedia, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom'

const ViewMyLot = () => {
    const [rowLot, setRowLot] = useState(null)
    const Uid = sessionStorage.getItem('uId')


    const fetchLot = () => {
        axios
            .get(`http://localhost:5000/AuctionheadWon/${Uid}`)
            .then((response) => {
                console.log(response.data.auctionhead);
                setRowLot(response.data.auctionhead)
            })
    }

    useEffect(() => {
        fetchLot()
    }, [])
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            {
                rowLot && rowLot.map((item, key) => (
                    <Card sx={{ m: 3, p: 5, width: '40%' }} key={key}>
                        <Carousel
                            height={'400px'}
                            stopAutoPlayOnHover={true}
                            autoPlay={false}
                        >
                            {item.galleries.map((post, key) => (
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
                        <Box sx={{ textAlign: 'center' }}>
                            <Box>
                                {item.name}
                            </Box>
                            <Box>
                                {item.details}
                            </Box>
                            {
                                console.log(item)
                            }
                            {
                                item.auctionheadStatus === 2 ?
                                    ' Payment Completed'
                                    :
                                    <Link to={`/User/CheckOut/${item._id}`}>
                                        <Button variant='contained'>Payment</Button>
                                    </Link>
                            }

                        </Box>

                    </Card>
                ))
            }


        </Box>
    )
}

export default ViewMyLot