import React, { useState } from 'react'
import { Typography, makeStyles, Grid, Paper, Box, Button } from '@material-ui/core';
import { Routes, Route, useNavigate } from "react-router-dom";
import { ActionColumnFormatter } from '../../../../utility/actionFormatters';
import PaginatedTable from '../../../../components/PaginatedTable';
import UomEditDialog from './UomEditDialog';
import DeleteModal from '../../modals/DeleteModal';
import { getAllUoms } from '../../../../redux/Uom/UomActions';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "auto",
        backgroundColor: theme.palette.primary.dark,
        boxSizing: "border-box",
    },
    container: {
        backgroundColor: "transparent",
        height: "100%",
        color: "#fff",
        padding: theme.spacing(2)
    },
    header: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "10px 0px"
    }
}))

const Uom = ({ uoms, totalCount, getAllUoms }) => {
    const navigate = useNavigate();
    const classes = useStyles();

    const [uomEditOpen, setUomEditOpen] = useState(true)
    const [showUomDelete, setShowUomDelete] = useState(false)
    const onUomEditClose = () => {
        setUomEditOpen(false)
        navigate(`/main/admin/uom`)
    }
    const handleUomDeleteClose = () => setShowUomDelete(false)
    const handleUomDeleteOpen = () => setShowUomDelete(true)

    const UomUiEvents = {
        addNewUomClick: () => {
            navigate(`/main/admin/uom/new`)
            setUomEditOpen(true)
        },
        editUomClick: (id) => {
            navigate(`/main/admin/uom/${id}/edit`) //id is the specific record id from api send when click on edit btn
            setUomEditOpen(true)
        }
    }

    const columns = [
        { id: '_id', label: 'Id', align: "center" },
        { id: 'name', label: 'Name', align: "center" },
        { id: "isActive", label: "Status", align: "center", format: (value) => <div>{value.isActive ? "Active" : "in Active"}</div> },
        { id: "action", label: "Action", align: "center", format: (value) => <ActionColumnFormatter value={value} onEdit={UomUiEvents.editUomClick} dontView={true} /> },
    ];

    return (
        <Grid item className={classes.root} md={12} xs={12} container>
            <Grid item md={12} xs={12}>
                <Paper variant='outlined' elevation={0} className={classes.container}>
                    <Box className={classes.header}>
                        <Typography variant='h3'>
                            Uom
                        </Typography>
                        <Button variant="outlined" color="secondary" onClick={() => UomUiEvents.addNewUomClick()}>
                            Add new
                        </Button>
                    </Box>
                    <PaginatedTable
                        columns={columns}
                        totalCount={totalCount}
                        data={uoms}
                        fetchData={getAllUoms}
                    />
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

const mapStateToProps = (state) => ({
    uoms: state.uoms.uoms,
    totalCount: state.uoms.totalCount
})

const actions = {
    getAllUoms
}

export default connect(mapStateToProps, actions)(Uom);
