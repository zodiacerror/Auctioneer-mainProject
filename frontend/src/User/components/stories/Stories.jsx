import './stories.scss'
import { Box, Card } from '@mui/material'

const Stories = ({rows}) => {
  
  

   return (
      <div className='stories'>
         {rows.map((story, key) => (
            <Box sx={{width:250}} key={key}>
               <Card
                  className='story'
                  key={key}
               >
                  <img
                     src={story.galleries[0].lotImgsrc}
                     alt=''
                  />
                  <span>{story.auctionheadToken}</span>
                  <a href="car" className='link'  rel='noopener noreferrer'>View Details</a>

               </Card>
            </Box>
         ))}
      </div>
   )
}

export default Stories
