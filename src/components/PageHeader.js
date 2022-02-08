import React from 'react';
import { Typography, makeStyles, Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "10px 0px"
    }
}))

const PageHeader = ({ title, buttonTitle, headerAction}) => {
    const classes = useStyles()
    return (
        <Box className={classes.header}>
            <Typography variant='h3'>
                {title}
            </Typography>
            <Button variant="outlined" color="secondary" onClick={headerAction}>
                {buttonTitle}
            </Button>
        </Box>
    )
};

export default PageHeader;
