import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Avatar, Box, Button } from '@mui/material'
import axios from 'axios'

const ViewLot = () => {
   const [rows, setRows] = useState([])
   const rowsWithId = rows.map((row, index) => ({ ...row, id: index + 1 }))
   const columns = [
      { field: '_id', headerName: 'ID', flex: 3 },
      {
         field: 'antiqueimgsrc',
         headerName: 'Photo',
         flex: 3,
         renderCell: (params) => {
            console.log(params)
            return (
               <>
                  <Avatar
                     src={params.row.antiqueimgsrc}
                     // onClick={() => deleteData(params.row.ward_id)}
                  />
               </>
            )
         },
      },
      {
         field: 'name',
         headerName: 'Name',
         flex: 3,
      },
      {
         field: 'quantity',
         headerName: 'Quality',
         flex: 3,
      },
      {
         field: 'Action',
         headerName: 'Action',

         flex: 4,
         renderCell: (params) => {
            return (
               <Box sx={{ display: 'flex', gap: 3 }}>
                  <Button
                     variant='outlined'
                     onClick={() => acceptLot(params.row._id)}
                  >
                     Accept
                  </Button>
                  <Button
                     variant='outlined'
                     onClick={() => rejectLot(params.row._id)}
                  >
                     Reject
                  </Button>
               </Box>
            )
         },
      },
   ]

   const fetchLot = () => {
      axios.get('http://localhost:5000/LotVerification').then((response) => {
         console.log(response.data.lot)
         setRows(response.data.lot)
      })
   }

   const acceptLot = (Id) => {
      axios.put(`http://localhost:5000/acceptLot/${Id}`).then((response) => {
         console.log(response.data)
         axios
            .post('http://localhost:5000/Auctionhead', { Id })
            .then((response) => {
               console.log(response.data)
               fetchLot()
            })
      })
   }
   const rejectLot = (Id) => {
      axios.put(`http://localhost:5000/rejectLot/${Id}`).then((response) => {
         console.log(response.data)
      })
   }

   useEffect(() => {
      fetchLot()
   }, [])
   return (
      <Box sx={{ height: 400, width: '100%' }}>
         <DataGrid
            rows={rowsWithId}
            columns={columns}
            initialState={{
               pagination: {
                  paginationModel: {
                     pageSize: 5,
                  },
               },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
         />
      </Box>
   )
}

export default ViewLot
