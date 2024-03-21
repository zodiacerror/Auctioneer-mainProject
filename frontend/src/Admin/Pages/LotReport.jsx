import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';

const columns = [

    {
        field: "userProfile",
        headerName: "",
        width: 50,
        renderCell: (params) => {
          return (
            <>
              <Avatar
                
                className="divListDelete"
                src={params.row.userProfile}
              />
            </>
          );
        },
      },
    { field: 'userName', headerName: 'PARTICIPANTS', width: 200 },
    { field: 'price', headerName: 'INITIAL PRICE', width: 200 },
    { field: 'realPrice', headerName: 'BID PRICE', width: 200 },

   
];



const DailyReport = () => {

    const [rows, setRows] = useState([])
    const rowsWithId = rows.map((row, index) => ({ ...row, id: index + 1 }));

    const{id} = useParams()
    console.log(id);

    const fetchLot = () => {
        axios.get(`http://localhost:5000/LotReportData/${id}`).then((response) => {
            console.log(response.data.lotreport)
            setRows(response.data.lotreport)
        })
    }

    useEffect(() => {
        fetchLot()
    }, [])

    return (
        <div style={{ height: 400, width: '100%' }}>
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
        </div>
    );
}

export default DailyReport;