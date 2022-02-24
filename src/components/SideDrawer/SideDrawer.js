import React, { useEffect, useState } from 'react';
import { isTablet, isMobile } from "react-device-detect";
import { useNavigate, useLocation } from 'react-router-dom';
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
import { ChevronLeft, ExpandLess, ExpandMore } from "@material-ui/icons"
import { AdministrationLinks, WarehouseOptLinks, LogisticsLinks, ReportingLinks } from './sidebarLinks';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    root: {
        // width:'inherit',
        backgroundColor: theme.palette.primary.light,
        color: "#fff",
        "& .MuiListItemIcon-root": {
            minWidth: "28px"
        },
        overflowY: "auto",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
            width: 6,
        },
        "&::-webkit-scrollbar-track": {
            boxShadow: "inset 0 0 6px rgba(0,0,0,0.08)",
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.08)",
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.2)",
        },
        "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(0,0,0,.4)",
        },
    },
    drawerHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0px 18px",
    },
    sublink: {
        paddingLeft: 40,
        cursor: "pointer"
    }
}))

const drawerWidth = 240;

const DrawerLink = ({ icon, label, subLinks }) => {
    const classes = useStyles()
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { role } = useSelector((state) => ({
        role: state.auth.userRole
    }))

    const [activeLink, setActiveLink] = useState("")

    useEffect(() => {
        setActiveLink(pathname.split("/")[3])
    }, [pathname])

    return (
        <List component="nav" dense={true}>
            <ListItem button>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={label} />
                <ExpandMore fontSize='small' />
            </ListItem>
            <Collapse in={true} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense={true}>
                    {
                        subLinks.map((link) => {
                            if(link.allowed && link.allowed.includes(role.type)) {
                                return (
                                    <ListItem button key={link.label} index={link.label} className={classes.sublink} onClick={() => navigate(link.path)}>
                                        <ListItemText primary={link.label} style={{ color: link.path.includes(activeLink) ? "#fff" : "#ccc" }} />
                                    </ListItem>
                                ) 
                            }else {
                                return null
                            }   
                        })
                    }
                </List>
            </Collapse>
        </List>
    )
}

const SideDrawer = ({ open, closeDrawer }) => {
    const classes = useStyles()
    isTablet && alert("Tablet Screen")

    useEffect(() => {
        console.log("tablet", isTablet)
        console.log("mobile", isMobile)
    }, [isMobile, isTablet])

    return (
        <Box style={{ width: (isTablet || isMobile || !open) ? 0 : drawerWidth }}>
            <Drawer
                style={{ width: (isTablet || isMobile || !open) ? 0 : drawerWidth }}
                variant="persistent"
                anchor='left'
                open={open}
                classes={{ paper: classes.root }}
            >
                <Box className={classes.drawerHeader}>
                    <Typography variant="h4">Oware</Typography>
                    <IconButton onClick={closeDrawer}>
                        <ChevronLeft fontSize="small" style={{ color: "#fff" }} />
                    </IconButton>
                </Box>
                <Divider />
                {[AdministrationLinks, WarehouseOptLinks, LogisticsLinks, ReportingLinks].map((module) => (
                    <>
                        <Divider />
                        <DrawerLink
                            icon={module.icon}
                            label={module.label}
                            subLinks={module.sublinks}
                        />
                    </>
                ))}
            </Drawer>
        </Box>
    )
}

export default SideDrawer;