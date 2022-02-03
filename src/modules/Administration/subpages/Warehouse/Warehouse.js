import React, {useState} from 'react'
import { Typography,makeStyles,Grid,Paper,Box,Button} from '@material-ui/core';
import { Routes,Route,useNavigate } from "react-router-dom";
import { ActionColumnFormatter} from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import WarehouseEditDialog from './WarehouseEditDialog';
import DeleteModal from '../../modals/DeleteModal';
import { getAllWarehouses } from '../../../../redux/Warehouse/WarehouseActions';
import { connect } from 'react-redux';

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

const Warehouse = ({warehouses,totalCount,getAllWarehouses}) => {
    const navigate=useNavigate();
    const classes=useStyles();

    const [warehouseEditOpen,setWarehouseEditOpen]=useState(true)
    const [showWarehouseDelete,setShowWarehouseDelete]=useState(false)

    const onWarehouseEditClose=()=>{
        setWarehouseEditOpen(false)
        navigate(`/main/admin/warehouse`)
    }
    const handleWarehouseDeleteClose=()=>setShowWarehouseDelete(false)
    const handleWarehouseDeleteOpen=()=>setShowWarehouseDelete(true)

    const WarehouseUiEvents={
        addNewWarehouseClick:()=>{
            navigate(`/main/admin/warehouse/new`)
            setWarehouseEditOpen(true)
        },
        editWarehouseClick:(id)=>{
            navigate(`/main/admin/warehouse/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setWarehouseEditOpen(true)
        }  
    }

    const columns = [
        { id: 'businessWarehouseCode', label: 'Code', align: 'center' },
        { id: 'name', label: 'Name', align:"center" },
        { id: 'address', label: 'Address', align: 'center' },
        { id: 'city', label: 'City', align: 'center' },
        { id: "isActive", label: "Status", align: "center", format:(value)=><div>{value.isActive ? "Active" : "in Active"}</div> },
        { id: "action", label: "Action", align: "center", format:(value)=><ActionColumnFormatter value={value} onEdit={WarehouseUiEvents.editWarehouseClick} onDelete={handleWarehouseDeleteOpen}/> },        
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Warehouse
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={()=>WarehouseUiEvents.addNewWarehouseClick()}>
                            Add new
                        </Button>
                    </Box>
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={warehouses}
                        fetchData={getAllWarehouses}
                    />
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

const mapStateToProps=(state)=>({
    warehouses:state.warehouses.warehouses,
    totalCount:state.warehouses.totalCount
})

const actions = {
    getAllWarehouses
}

export default connect(mapStateToProps,actions)(Warehouse);
