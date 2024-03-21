import React, { useEffect, useState } from 'react'
import { DataGrid, GridDeleteIcon, GridMoreVertIcon, GridViewColumnIcon } from '@mui/x-data-grid';
import axios from 'axios';
import { Avatar, Box, Typography } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import RemoveRedEyeOutlined from '@mui/icons-material/RemoveRedEyeOutlined';
import { Link, useParams } from 'react-router-dom';

const columns = [
    { field: 'auctionheadDate', headerName: 'Date', width: 100 },
    {
        field: "dealerProfile",
        headerName: "Dealer Profile",
        width: 100,
        renderCell: (params) => {
          return (
            <>
              <Avatar
                className="divListDelete"
                src={params.row.dealerProfile}
              />
            </>
          );
        },
      },
    { field: 'dealerName', headerName: 'Dealer name', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    {
        field: "galleries",
        headerName: "Image",
        width: 100,
        renderCell: (params) => {
          return (
            <>
              <Avatar
                
                className="divListDelete"
                src={params.row.lotImgsrc
                }
              />
            </>
          );
        },
      },
    { field: 'details', headerName: 'Details', width: 200 },
    {
        field: "action",
        headerName: "Action",
        width: 100,
        renderCell: (params) => {
          return (
            <><Link to={`/Admin/Lotreport/${params.row.auctionheadId}`} >
              <RemoveRedEyeOutlined/>
              </Link>
            </>
          );
        },
      },
   
];



const DailyReport = () => {

    const [rows, setRows] = useState([])
    const rowsWithId = rows.map((row, index) => ({ ...row, id: index + 1 }));


    const fetchLot = () => {
        axios.get(`http://localhost:5000/DailyReportData/`).then((response) => {
            console.log(response.data.dailyreport)
            setRows(response.data.dailyreport)
        })
    }

    useEffect(() => {
        fetchLot()
    }, [])

    return (
        <Box style={{ height: 400, width: '100%' }}>
          <Typography variant='h5' sx={{m:3}}>Reports</Typography>
            <DataGrid
                rows={rowsWithId}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection />
        </Box>
    );
}

export default DailyReport;