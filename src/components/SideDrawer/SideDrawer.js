import React, {useEffect,useState} from 'react';
import { isTablet,isMobile } from "react-device-detect";
import { useNavigate,useLocation } from 'react-router-dom';
import {
    makeStyles,
    Drawer,
    Typography,
    List,
    ListItemText,
    ListItemIcon,
    ListItem,
    Collapse,
    Divider,
    Box,
    IconButton
} from "@material-ui/core";
import {ChevronLeft,ExpandLess,ExpandMore} from "@material-ui/icons"
import { AdministrationLinks,WarehouseOptLinks,LogisticsLinks,ReportingLinks } from './sidebarLinks';


const useStyles=makeStyles((theme)=>({
    root:{
        width:'inherit',
        backgroundColor:theme.palette.primary.light,
        color:"#fff",
        overflow:"none",
        "& .MuiListItemIcon-root":{
            minWidth:"28px"
        },
        "& .MuiDrawer-paper":{
            overflow:"hidden",
            /* width */
            "& .MuiDrawer-paper::-webkit-scrollbar":{
                width: "10px"
            },
            /* Track */
            "& .MuiDrawer-paper::-webkit-scrollbar-track": {
                background: "#f1f1f1"
            },
            /* Handle */
            "& .MuiDrawer-paper::-webkit-scrollbar-thumb": {
                background: "#888"
            },
            /* Handle on hover */
            "& .MuiDrawer-paper::-webkit-scrollbar-thumb:hover": {
                background: "#555" 
            }
        }
    },
    drawerHeader:{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between",
        padding:"0px 18px",
    },
    sublink:{
        paddingLeft:40,
        cursor:"pointer"
    }
}))

const drawerWidth = 220;

const DrawerLink=({icon,label,subLinks})=>{
    const classes=useStyles()
    const navigate=useNavigate();
    const {pathname} =useLocation();

    const [activeLink,setActiveLink]=useState("")

    useEffect(()=>{
        console.log(pathname,pathname.split("/")[3])
        setActiveLink(pathname.split("/")[3])
    },[pathname])

    return (
        <List component="nav" dense={true}>
            <ListItem button>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
                <ExpandMore fontSize='small'/>
            </ListItem>
            <Collapse in={true} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense={true}>
                {
                    subLinks.map((link)=>{
                        return (
                            <ListItem button  index={link.label} className={classes.sublink} onClick={()=>navigate(link.path)}>
                                <ListItemText primary={link.label} style={{color:link.path.includes(activeLink)?"#fff":"#ccc"}} />
                            </ListItem>
                        )
                    })
                }
                </List>
            </Collapse>
        </List>
    )
}

const SideDrawer = ({open,closeDrawer}) => {
    const classes=useStyles()
    console.log(isTablet,isMobile)
    isTablet && alert("Tablet Screen")

    useEffect(()=>{
        console.log("tablet", isTablet)
        console.log("mobile", isMobile)
    },[isMobile,isTablet])
    return (
            <Drawer
               style={{width:isTablet || !open ? 0 : drawerWidth}}
               variant="persistent"
               anchor='left'
               open={open}
               classes={{paper:classes.root}}
            >
               <Box className={classes.drawerHeader}>
                    <Typography variant="h4">Oware</Typography>
                    <IconButton onClick={closeDrawer}>
                        <ChevronLeft fontSize="small" style={{color:"#fff"}}/>
                    </IconButton>
               </Box>
               <Divider/>
               <DrawerLink
                    icon={AdministrationLinks.icon}
                    label={AdministrationLinks.label}
                    subLinks={AdministrationLinks.sublinks}
               />
               <Divider/>
               <DrawerLink
                    icon={WarehouseOptLinks.icon}
                    label={WarehouseOptLinks.label}
                    subLinks={WarehouseOptLinks.sublinks}
               />
               <Divider/>
               <DrawerLink
                    icon={LogisticsLinks.icon}
                    label={LogisticsLinks.label}
                    subLinks={LogisticsLinks.sublinks}
               />
               <Divider/>
               <DrawerLink
                    icon={ReportingLinks.icon}
                    label={ReportingLinks.label}
                    subLinks={ReportingLinks.sublinks}
               />
            </Drawer>
    )
}

export default SideDrawer;