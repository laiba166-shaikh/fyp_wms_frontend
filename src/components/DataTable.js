import React from 'react';
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

const DataTable = ({entities,columns}) => {
    return (
        <BootstrapTable
            wrapperClasses='table-responsive'
            bootstrap4
            remote
            bordered={false}
            classes="table table-head-custom table-vertical-center text-white-50 overflow-auto align-middle border-bottom-0"
            rowStyle={{outline:"none",border:"none"}}
            
            headerClasses='text-white-50'
            keyField="id"
            data={entities}
            columns={columns}
        />
    )
}

export default DataTable;
