import React, { useState } from 'react'
import {useReactTable,
        getCoreRowModel,
        flexRender,
        getPaginationRowModel,
        getSortedRowModel,
        getFilteredRowModel
} from '@tanstack/react-table'

const BasicTable = ({data,columns}) => {

   
    const [sorting,setSorting] = useState([]);
    const [filtering,setfiltering] = useState('');
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel(),
        getPaginationRowModel:getPaginationRowModel(),
        getSortedRowModel:getSortedRowModel(),
        getFilteredRowModel:getFilteredRowModel(),
        state:{
            sorting:sorting,
            globalFilter:filtering,
        },
        onSortingChange:setSorting,
        onGlobalFilterChange:setfiltering
    })


  return (
    <div style={{display:'flex',flexDirection:'column'}}>
        <input
        style={{width:'10vw',marginBottom:'2vh'}}
        type='text'
        value={filtering}
        onChange={e=>setfiltering(e.target.value)}
        />
    <table style={{}}>
        <thead>
        {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <th key={header.id} onClick={header.column.getToggleSortingHandler()}>
                        {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                        {
                            {asc:'⬆️',desc:'⬇️'}[header.column.getIsSorted()?? null]
                        }
                    </th>
                ))}
            </tr>
        ))}
        </thead>
        <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell,cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
        {/* <tfooter>
            <tr>
                <td>
                    ID
                </td>
            </tr>
        </tfooter> */}
    </table>
    <div style={{marginTop:'10vh'}}>
        <button style={{padding:'4px'}}  onClick={()=>table.setPageIndex(0)}>First Page</button>
        <button style={{padding:'4px'}} disabled={!table.getCanPreviousPage()} onClick={()=> table.previousPage()}>Previous Page</button>
        <button style={{padding:'4px'}} disabled={!table.getCanNextPage()} onClick={()=> table.nextPage()}>Next Page</button>
        <button style={{padding:'4px'}}onClick={()=> table.setPageIndex(table.getPageCount()-1)}>Last Page</button>
    </div>
    </div>
  )
}

export default BasicTable
