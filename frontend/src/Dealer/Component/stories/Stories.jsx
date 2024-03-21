import './stories.scss'
import { Box, Card } from '@mui/material'

const Stories = () => {
  

  

   return (
      <div className='stories'>
            <Box sx={{width:250}} >
               <Card
                  className='story'
               >
                  <img
                     src={''}
                     alt=''
                  />
                  <span>{''}</span>
                  <a href="car" className='link'  rel='noopener noreferrer'>View Details</a>

               </Card>
            </Box>
      </div>
   )
}

export default Stories
