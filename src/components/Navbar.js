import React,{useState} from 'react'
import { AppBar,Box,Toolbar, IconButton, Avatar,Menu,MenuItem, makeStyles} from '@material-ui/core';
import {MenuOutlined} from "@material-ui/icons"
import { Link,useNavigate } from "react-router-dom";

const useStyles=makeStyles((theme)=>({
    appBar:{
        backgroundColor:theme.palette.primary.main,
        padding:"0px 12px",
        border:0
    }
}));

const NavMenu = ({ anchorE1, setAnchorE1}) => {
    const navigate=useNavigate();
    const closeMenu = () => {
      setAnchorE1(null);
    };
    return (
      <Menu
        id="simple-menu"
        anchorEl={anchorE1}
        keepMounted
        open={Boolean(anchorE1)}
        onClose={closeMenu}             
      >
        <Link to="#">
          <MenuItem onClick={closeMenu}>Profile</MenuItem>
        </Link>
        <MenuItem onClick={()=>{
            navigate("/")
            closeMenu()
        }}> Logout </MenuItem>
      </Menu>
    );
};

const Navbar = ({open,showDrawer}) => {
    const classes=useStyles();
    const [anchorE1, setAnchorE1] = useState(false); 
    return (
        <AppBar position="static" className={classes.appBar} sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}>
            <Toolbar style={{justifyContent:"space-between"}}>
                <IconButton
                    edge="start"
                    aria-label="menu"
                    onClick={showDrawer}
                >
                    <MenuOutlined fontSize="medium"
                        style={{ color: "#FFF" }}
                    />
                </IconButton>

                <Box sx={{ flexGrow: 0 }}>
                    <IconButton onClick={(e) => setAnchorE1(e.currentTarget)} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="" />
                    </IconButton>
                    <NavMenu
                        anchorE1={anchorE1}
                        setAnchorE1={setAnchorE1}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;