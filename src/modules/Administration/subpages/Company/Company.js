import React, {useState} from 'react'
import { Typography,makeStyles,Grid,Paper,Box,Button} from '@material-ui/core';
import { Routes,Route,useNavigate } from "react-router-dom";
import { ActionColumnFormatter, StatusFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import CompanyEditDialog from './CompanyEditDialog';
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

const Company = () => {
    const navigate=useNavigate();

    const [companyEditOpen,setCompanyEditOpen]=useState(true)
    const [showCompanyDelete,setShowCompanyDelete]=useState(false)
    const onCompanyEditClose=()=>{
        setCompanyEditOpen(false)
        navigate(`/main/admin/company`)
    }
    const handelCompanyEditOpen=()=>setCompanyEditOpen(true)
    const handleCompanyDeleteClose=()=>setShowCompanyDelete(false)
    const handleCompanyDeleteOpen=()=>setShowCompanyDelete(true)

    const UserUiEvents={
        addNewCompanyClick:()=>{
            navigate(`/main/admin/company/new`)
            setCompanyEditOpen(true)
        },
        editCompanyClick:(id)=>{
            navigate(`/main/admin/comapny/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setCompanyEditOpen(true)
        }  
    }

    const classes=useStyles();
    const data=[
        {id:1,type:"Exporter",name:"Company A",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
        {id:2,type:"Manufacturer",name:"Company B",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:false},
        {id:3,type:"Importer",name:"Company C",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
        {id:4,type:"Importer",name:"Company C",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
        {id:5,type:"Importer",name:"Company C",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
        {id:6,type:"Importer",name:"Company C",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
        {id:7,type:"Importer",name:"Company C",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
        {id:8,type:"Importer",name:"Company C",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
    ]

    const columns = [
        { id: 'id', label: 'Id', align:"center"},
        { id: 'name', label: 'Name', align:"center" },
        { id: 'type', label: 'Type', align: 'center' },
        { id: 'phone', label: 'Phone Number', align: 'center' },
        { id: 'notes', label: 'Notes', align: 'center' },
        { id: "isActive", label: "Status", align: "center", format:(value)=><StatusFormatter value={value}/> },
        { id: "action", label: "Action", align: "center", format:(value)=><ActionColumnFormatter value={value} onEdit={handelCompanyEditOpen} onDelete={handleCompanyDeleteOpen}/> },        
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Company
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={()=>UserUiEvents.addNewCompanyClick()}>
                            Add new
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={()=>handleCompanyDeleteOpen()}>
                            Edit
                        </Button>
                    </Box>
                    <PaginatedTable columns={columns} entities={data} />
                    <Routes>
                        <Route path="new" element={<CompanyEditDialog show={companyEditOpen} onClose={onCompanyEditClose} />} />
                        <Route path=":id/edit" element={<CompanyEditDialog show={companyEditOpen} onClose={onCompanyEditClose} />} />  
                    </Routes>
                    <DeleteModal
                        show={showCompanyDelete}
                        handleClose={handleCompanyDeleteClose}
                        entityName={"Company"}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Company;
