import {EditOutlined, DeleteOutlined} from "@material-ui/icons";
import { FormControlLabel,makeStyles,Switch, useTheme } from "@material-ui/core";

const useStyles=makeStyles((theme)=>({
    icon:{
        fontSize:22,
        margin:"0 3px",
        cursor:"pointer",
    }
}))

export function ActionColumnFormatter(value,onEdit,onDelete){
    const classes=useStyles()
    return (
        <>
            <span onClick={onEdit}>
               <EditOutlined style={{color:"#2e7d32"}} className={classes.icon}/> 
            </span>
            <span onClick={onDelete}>
               <DeleteOutlined style={{color:"#d32f2f"}} className={classes.icon} /> 
            </span>
        </>
    )
}

export function StatusFormatter(value) {
    const theme=useTheme()
    return (
        <>
        <FormControlLabel control={<Switch defaultChecked checked={true} size="small" color={theme.palette.success.main} />} label="" />
        </>
    )
}