import {EditOutlined, DeleteOutlined} from "@material-ui/icons";
import { FormControlLabel,Switch } from "@material-ui/core";

export function ActionColumnFormatter(cellContent,row,rowIndex){
    return (
        <>
            <span
                // title="Edit User"
                // className='p-1 mx-2'
            >
               <EditOutlined style={{fontSize:22,margin:"0 3px",cursor:"pointer"}}/> 
            </span>
            <span
                // title="Delete User"
                // className='btn btn-light btn-sm btn-hover-primary mx-1'
            >
               <DeleteOutlined style={{fontSize:22,margin:"0 2px",cursor:"pointer"
            }}/> 
            </span>
        </>
    )
}

export function StatusFormatter(cellContent,row,rowIndex) {
    return (
        <>
        <FormControlLabel control={<Switch defaultChecked checked={row.status} size="small" color="secondary" />} label={null} />
        </>
    )
}