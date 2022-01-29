import React, {useState} from 'react'
import { Typography,makeStyles,Grid,Paper,Box,Button} from '@material-ui/core';
import { Routes,Route,useNavigate } from "react-router-dom";
import { ActionColumnFormatter, StatusFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import UomEditDialog from './UomEditDialog';
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

const Uom = () => {
    const navigate=useNavigate();

    const [uomEditOpen,setUomEditOpen]=useState(true)
    const [showUomDelete,setShowUomDelete]=useState(false)
    const onUomEditClose=()=>{
        setUomEditOpen(false)
        navigate(`/main/admin/uom`)
    }
    const handleUomDeleteClose=()=>setShowUomDelete(false)
    const handleUomDeleteOpen=()=>setShowUomDelete(true)

    const UomUiEvents={
        addNewUomClick:()=>{
            navigate(`/main/admin/uom/new`)
            setUomEditOpen(true)
        },
        editUomClick:(id)=>{
            navigate(`/main/admin/uom/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setUomEditOpen(true)
        }  
    }

    const classes=useStyles();
    const data=[
        {id:1,name:"Uom A",isActive:true},
        {id:2,name:"Uom B",isActive:false},
        {id:3,name:"Uom C",isActive:true},
        {id:4,name:"Uom C",isActive:true},
        {id:5,name:"Uom C",isActive:true},
        {id:6,name:"Uom C",isActive:true},
        {id:7,name:"Uom C",isActive:true},
        {id:8,name:"Uom C",isActive:true},
    ]

    const columns = [
        { id: 'id', label: 'Id', align:"center"},
        { id: 'name', label: 'Name', align:"center" },
        { id: "isActive", label: "Status", align: "center", format:(value)=><StatusFormatter value={value}/> },
        { id: "action", label: "Action", align: "center", format:(value)=><ActionColumnFormatter value={value} onEdit={UomUiEvents.editUomClick} onDelete={handleUomDeleteOpen}/> },        
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Uom
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={()=>UomUiEvents.addNewUomClick()}>
                            Add new
                        </Button>
                    </Box>
                    <PaginatedTable columns={columns} entities={data} />
                    <Routes>
                        <Route path="new" element={<UomEditDialog show={uomEditOpen} onClose={onUomEditClose} />} />
                        <Route path=":id/edit" element={<UomEditDialog show={uomEditOpen} onClose={onUomEditClose} />} />  
                    </Routes>
                    <DeleteModal
                        show={showUomDelete}
                        handleClose={handleUomDeleteClose}
                        entityName={"Uom"}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Uom;
