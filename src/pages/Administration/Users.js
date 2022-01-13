import React from 'react'
import { Typography,makeStyles,Grid,Paper,Box,Button } from '@material-ui/core';
import DataTable from '../../components/DataTable';
import { ActionColumnFormatter } from '../../utility/actionFormatters';
// import ContentContainer from '../../components/ContentContainer';

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
        // margin:"64px 12autopx",
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

const Users = () => {
    const classes=useStyles();
    const data=[
        {id:1,firstName:"David",lastName:"Wiley",role:"Admin",username:"David Walley",email:"david@gmail.com",phone:"+1 123 4567",isActive:true},
        {id:2,firstName:"Walter",lastName:"Jones",role:"Super Admin",username:"Walter Jones",email:"walter@gmail.com",phone:"+1 123 4567",isActive:false},
        {id:3,firstName:"Eric",lastName:"Ryder",role:"Admin",username:"Eric Ryder",email:"ryder@gmail.com",phone:"+1 123 4567",isActive:true},
    ]
    const columns = [
        {
          dataField: "id",
          text: "User Id",
          classes:"text-center",
          headerClasses:"text-center"
        },
        {
          dataField: "firstName",
          text: "First Name",
          classes:"text-center",
          headerClasses:"text-center"
        },
        {
            dataField:"lastName",
            text:"Last Name",
            classes:"text-center",
            headerClasses:"text-center"
        },
        {
            dataField:"phone",
            text:"Phone Number",
            classes:"text-center",
            headerClasses:"text-center"
        },
        {
            dataField:"username",
            text:"User Name",
            classes:"text-center",
            headerClasses:"text-center"
        },
        {
            dataField:"role",
            text:"Role",
            classes:"text-center",
            headerClasses:"text-center"
        },
        {
            dataField:"email",
            text:"Email",
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
                                Users
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

export default Users
