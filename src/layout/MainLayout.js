import React, {useState} from 'react'
import { Grid, makeStyles, Box,CssBaseline } from '@material-ui/core'
import Navbar from '../components/Navbar';
import SideDrawer from '../components/SideDrawer/SideDrawer';
import { Outlet } from 'react-router';

const useStyles=makeStyles((theme)=>({
    root:{
        backgroundColor:"#faf9f9",
        boxSizing:"border-box"
    },
    mainContent:{
        backgroundColor:"#e5e5e5",
        padding:"128px 64px",
        border:"1px solid #000",
    }
}))

const MainLayout = () => {
    const classes = useStyles()

    const [isOpen,setIsOpen]=useState(true);

    const handleDrawerOpen = () => {
        setIsOpen(true);
    };
    
    const handleDrawerClose = () => {
        setIsOpen(false);
    };
    
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Navbar open={isOpen} showDrawer={handleDrawerOpen} />
            <div style={{display:"flex"}}>
                <SideDrawer open={isOpen} closeDrawer={handleDrawerClose} />
                <Grid container style={{height:"100%",width:"100%"}}>
                    <Outlet/>
                </Grid>
            </div>
            
        </div>
    )
};

export default MainLayout;
