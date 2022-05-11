import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box, Button, IconButton, Modal, Pagination, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import usePagination from '../Pagination';
import { http } from '../config/http';
import { useFormik } from 'formik';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Ticket({getList}) {
    const [modalOpen,setModalOpen]=useState(false);
    const [ticketList,setTicketList]=useState([]);
    const [ticketData,setTicketData]=useState([]);
    let [pageCount,setPageCount]=useState(0);
    const [editId,setEditId]=useState(null);
    const [page, setPage] = useState(1)
    const [userData,setUserData] = useState({})
    
    const fullName = userData.firstName + " " + userData.lastName

    useEffect(()=>{
      
      try{
        console.log("hello");
        setUserData(JSON.parse(localStorage.getItem("user")))
        getList().then((res)=>{
        setTicketList(res)
      })
    }catch (e){
       console.log(e.message);
    }
    },
    []);
    
    const PER_PAGE = 10;
    const count = Math.ceil(ticketList?.length/PER_PAGE);
    const data = usePagination(ticketList, PER_PAGE)
    const handleChange = (e, p) => {
      setPageCount((p - 1) * 10)
      setPage(p)
      data.jump(p)
    }

    const deleteTicket = async (id) => {
      const res = await http.delete(`/ticket/${id}`)
      getList().then((res)=>{
        setTicketList(res)
      })
    }

    const editTicket = async (id) => {
      const res = await http.get(`ticket/${id}`,)
      setTicketData(res.data.tickets[0])
      setEditId(id)
      setModalOpen(true)
    }

    const formik = useFormik({
      initialValues:{
        title:ticketData.ticketTitle,
        description: ticketData.ticketDescription,
      },
      enableReinitialize:true,
      onSubmit: async (values) => {
        if(!editId){
          const res = await http.post("ticket/add", values)
          console.log("res");
        }
        else{
          const res = await http.put(`ticket/${editId}`, values)
          setEditId(null)
          setTicketData([])
        }
        setModalOpen(false)
        getList().then((res)=>{
          setTicketList(res)
        })
      }
    })
  return (
    <>
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Tickets &nbsp;
        <Button onClick={()=>{
            setModalOpen(true)
        }}>
             Add New Ticket
        </Button>

    </Typography>
    <Modal
        open={modalOpen}
        onClose={()=>{
            setModalOpen(false)
            setTicketData([])
            setEditId(null)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" onSubmit={formik.handleSubmit} sx={style}>
            <TextField 
            margin='normal'
            required
            fullWidth
            name='title'
            label='title'
            id='title'
            autoFocus
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={formik.touched.title && formik.errors.title}
            ></TextField>
            <TextField 
            margin='normal'
            required
            fullWidth
            name='description'
            label='description'
            id='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            ></TextField>
            <Button type='submit'>{editId ? "Edit Ticket" : "Add Ticket"}</Button>          
        </Box>
      </Modal>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Created By</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.currentData()?.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{(pageCount = pageCount + 1)}</TableCell>
              <TableCell>{row.ticketTitle}</TableCell>
              <TableCell>{row.ticketDescription}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.userName}</TableCell>
              <TableCell>
                {fullName === row.userName ?
                
                <IconButton aria-label='edit' 
                onClick={()=>{
                  
                  editTicket(row._id)
                }}
                
                color="primary">
                <EditIcon />
                </IconButton>
                :
                <IconButton aria-label='edit'
               disabled
                color="primary">
                <EditIcon />
                </IconButton>
}
                </TableCell>
                <TableCell>
                {fullName === row.userName ?
                <IconButton aria-label='delete'
                onClick={()=>{
                  deleteTicket(row._id)
                }}
                color="primary">
                <DeleteIcon />
                </IconButton>
                :
                <IconButton aria-label='delete'
                disabled
                color="primary">
                <DeleteIcon />
                </IconButton>
}
                </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br></br>
      <Box>
        <Pagination 
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Box>
    </>
  );
}