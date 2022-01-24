import React, {useState,useEffect} from 'react'
import { Typography,makeStyles,Grid,Paper,Box,Button } from '@material-ui/core';
import { Routes,Route,useLocation,useNavigate,useParams } from "react-router-dom";
import { ActionColumnFormatter, StatusFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import UserEditDialog from './UserEditDialog';
import DeleteModal from '../../modals/DeleteModal';

const useStyles=makeStyles((theme)=>({
    root:{
        width:"100%",
        height:"100%",
        overflowX:"hidden",
        overflowY:"auto",
        backgroundColor:theme.palette.primary.dark,
        boxSizing:"border-box",
    },
    container:{
        backgroundColor:"transparent",
        // margin:"64px 12px",
        height:"100%",
        color:"#fff",
        padding:theme.spacing(2)
    },
    header:{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        margin:"10px 0px"
    }
}))

const Users = (props) => {
    // const location=useLocation();
    // let params = useParams();
    // console.log("params -> ",params)
    // const pathId=location.pathname.split('/')[4]
    const navigate=useNavigate();

    const [open,setOpen]=useState(true)
    const [showDelete,setShowDelete]=useState(false)
    const onClose=()=>{
        setOpen(false)
        navigate(`/main/admin/users`)
    }
    const handelEditOpen=()=>setOpen(true)
    const handleDeleteClose=()=>setShowDelete(false)
    const handleDeleteOpen=()=>setShowDelete(true)

    const UserUiEvents={
        addNewUserClick:()=>{
            navigate(`/main/admin/users/new`)
            setOpen(true)
        },
        editUserClick:(id)=>{
            navigate(`/main/admin/users/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setOpen(true)
        }  
    }

    const classes=useStyles();
    const data=[
        {id:1,firstName:"David",lastName:"Wiley",role:"Admin",username:"David Walley",email:"david@gmail.com",phone:"+1 123 4567",isActive:true},
        {id:2,firstName:"Walter",lastName:"Jones",role:"Super Admin",username:"Walter Jones",email:"walter@gmail.com",phone:"+1 123 4567",isActive:false},
        {id:3,firstName:"Eric",lastName:"Ryder",role:"Admin",username:"Eric Ryder",email:"ryder@gmail.com",phone:"+1 123 4567",isActive:true},
    ]
    const columns = [
        { id: 'id', label: 'Id', align:"center"},
        { id: 'firstName', label: 'First Name', align:"center" },
        { id: 'lastName', label: 'last Name', align: 'center' },
        { id: 'role', label: 'Role', align: 'center' },
        { id: 'username', label: 'User Name', align: 'center' },
        { id: 'email',label:'Email',align: 'center'},
        { id: 'phone', label: 'Phone Number', align: 'center' },
        { id: "isActive", label: "Status", align: "center", format:(value)=><StatusFormatter value={value}/> },
        { id: "action", label: "Action", align: "center", format:(value)=><ActionColumnFormatter value={value} onEdit={handelEditOpen} onDelete={handleDeleteOpen}/> },        
    ];
    
    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Users
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={()=>UserUiEvents.addNewUserClick()}>
                            Add new
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={()=>handleDeleteOpen()}>
                            Edit
                        </Button>
                    </Box>
                    <PaginatedTable
                     columns={columns}
                     entities={data}
                    />
                    <Routes>
                        <Route path="new" element={<UserEditDialog show={open} onClose={onClose} />} />
                        <Route path=":id/edit" element={<UserEditDialog show={open} onClose={onClose} />} />  
                    </Routes>
                    <DeleteModal
                        show={showDelete}
                        handleClose={handleDeleteClose}
                        entityName={"User"}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Users
