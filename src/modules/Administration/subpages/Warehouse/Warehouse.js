import React, {useState} from 'react'
import { Typography,makeStyles,Grid,Paper,Box,Button} from '@material-ui/core';
import { Routes,Route,useNavigate } from "react-router-dom";
import { ActionColumnFormatter, StatusFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import WarehouseEditDialog from './WarehouseEditDialog';
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

const Warehouse = () => {
    const navigate=useNavigate();

    const [warehouseEditOpen,setWarehouseEditOpen]=useState(true)
    const [showWarehouseDelete,setShowWarehouseDelete]=useState(false)
    const onWarehouseEditClose=()=>{
        setWarehouseEditOpen(false)
        navigate(`/main/admin/warehouse`)
    }
    const handelWarehouseEditOpen=()=>setWarehouseEditOpen(true)
    const handleWarehouseDeleteClose=()=>setShowWarehouseDelete(false)
    const handleWarehouseDeleteOpen=()=>setShowWarehouseDelete(true)

    const UserUiEvents={
        addNewWarehouseClick:()=>{
            navigate(`/main/admin/warehouse/new`)
            setWarehouseEditOpen(true)
        },
        editWarehouseClick:(id)=>{
            navigate(`/main/admin/warehouse/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setWarehouseEditOpen(true)
        }  
    }

    const classes=useStyles();
    const data=[
        {id:1,address:"XYZ Road",name:"Warehouse A",city:"Karachi",businessWarehouseCode:"R-123",isActive:true},
        {id:2,address:"ABC Street",name:"Warehouse B",city:"Karachi",businessWarehouseCode:"C-577",isActive:false},
        {id:3,address:"XYZ Road",name:"Warehouse C",city:"Lahore",businessWarehouseCode:"R-789",isActive:true},
        {id:4,address:"ABC Street",name:"Warehouse C",city:"Karachi",businessWarehouseCode:"X-234",isActive:true},
        {id:5,address:"XYZ Road",name:"Warehouse C",city:"Islamabad",businessWarehouseCode:"R-021",isActive:true},
        {id:6,address:"ABC Street",name:"Warehouse C",city:"Karachi",businessWarehouseCode:"A-104",isActive:true},
        {id:7,address:"XYZ Road",name:"Warehouse C",city:"Lahore",businessWarehouseCode:"L-044",isActive:true},
        {id:8,address:"ABC Street",name:"Warehouse C",city:"Karachi",businessWarehouseCode:"H-059",isActive:true},
    ]

    const columns = [
        { id: 'id', label: 'Id', align:"center"},
        { id: 'name', label: 'Name', align:"center" },
        { id: 'address', label: 'Address', align: 'center' },
        { id: 'businessWarehouseCode', label: 'Code', align: 'center' },
        { id: 'city', label: 'City', align: 'center' },
        { id: "isActive", label: "Status", align: "center", format:(value)=><StatusFormatter value={value}/> },
        { id: "action", label: "Action", align: "center", format:(value)=><ActionColumnFormatter value={value} onEdit={handelWarehouseEditOpen} onDelete={handleWarehouseDeleteOpen}/> },        
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Warehouse
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={()=>UserUiEvents.addNewWarehouseClick()}>
                            Add new
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={()=>handleWarehouseDeleteOpen()}>
                            Edit
                        </Button>
                    </Box>
                    <PaginatedTable columns={columns} entities={data} />
                    <Routes>
                        <Route path="new" element={<WarehouseEditDialog show={warehouseEditOpen} onClose={onWarehouseEditClose} />} />
                        <Route path=":id/edit" element={<WarehouseEditDialog show={warehouseEditOpen} onClose={onWarehouseEditClose} />} />  
                    </Routes>
                    <DeleteModal
                        show={showWarehouseDelete}
                        handleClose={handleWarehouseDeleteClose}
                        entityName={"Warehouse"}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Warehouse;
