import {EditOutlined, DeleteOutlined} from "@material-ui/icons"

export function ActionColumnFormatter(cellContent,row,rowIndex){
    return (
        <>
            <a
                title="Edit User"
                className='btn btn-light btn-sm btn-hover-primary mx-2'
            >
               <EditOutlined style={{fontSize:16}}/> 
            </a>
            <a
                title="Delete User"
                className='btn btn-light btn-sm btn-hover-primary mx-1'
            >
               <DeleteOutlined style={{fontSize:16}}/> 
            </a>
        </>
    )
}