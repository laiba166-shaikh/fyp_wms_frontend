import {EditOutlined, DeleteOutlined} from "@material-ui/icons";
import { FormControlLabel,makeStyles,Switch, useTheme } from "@material-ui/core";

const useStyles=makeStyles((theme)=>({
    icon:{
        fontSize:22,
        margin:"0 3px",
        cursor:"pointer",
    }
}))

export function ActionColumnFormatter(rowData){
    console.log("value ->",rowData)
    const classes=useStyles()
    return (
        <>
            <span onClick={()=>rowData.onEdit(rowData.value.id)}>
               <EditOutlined style={{color:"#2e7d32"}} className={classes.icon}/> 
            </span>
            <span onClick={()=>rowData.onDelete(rowData.value.id)}>
               <DeleteOutlined style={{color:"#d32f2f"}} className={classes.icon} /> 
            </span>
        </>
    )
}

export function StatusFormatter(value) {
    const theme=useTheme()
    return (
        <>
        <FormControlLabel control={<Switch checked={true} size="small" color="secondary" />} label="" />
        </>
    )
}