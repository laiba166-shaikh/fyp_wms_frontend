import React from 'react'
import { Typography,makeStyles,Grid,Paper,Button,Box } from '@material-ui/core';
import DataTable from '../../components/DataTable';
import { ActionColumnFormatter } from '../../utility/actionFormatters';

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
        margin:"8px 0px"
    }
}))

const Company = () => {
    const classes=useStyles();
    const data=[
        {id:1,type:"Exporter",name:"Company A",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
        {id:2,type:"Manufacturer",name:"Company B",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:false},
        {id:3,type:"Importer",name:"Company C",notes:"lorem ipsum dolor sit amet,consectetur",phone:"+1 123 4567",isActive:true},
    ]
    const columns = [
        {
          dataField: "id",
          text: "ID",
          classes:"text-center",
          headerClasses:"text-center"
        },
        {
          dataField: "type",
          text: "Type",
          classes:"text-center",
          headerClasses:"text-center"
        },
        {
            dataField:"name",
            text:"Name",
            classes:"text-center align-middle",
            headerClasses:"text-center"
        },
        {
            dataField:"phone",
            text:"Phone Number",
            classes:"text-center",
            headerClasses:"text-center"
        },
        {
            dataField:"notes",
            text:"Notes",
            classes:"text-center",
            headerClasses:"text-center"
        },
        {
          dataField: "isActive",
          text: "Status",
          classes:"text-center",
          headerClasses:"text-center"
        },
        {
            dataField:"action",
            text:"Action",
            formatter:ActionColumnFormatter,
            classes:"text-center",
            headerClasses:"text-center"
        }
      ];
    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Company
                        </Typography>
                        <Button variant="outlined" color="secondary">
                            Add new
                        </Button>
                    </Box>
                    <DataTable entities={data} columns={columns} />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default Company;
