import React from 'react'
import AgGridPagination from '../../components/AgGridPagination/AgGridPagination'
import AgGridPaginationImage from '../../components/AgGridPaginationImage/AgGridPaginationImage'
import TableFilter from '../../components/TableFilter/TableFilter'
import CustomFilterTable from '../../components/CustomFilterTable/CustomFilterTable'

export default function index() {
  return (
    <>
      <div style={{marginBottom:"30px"}}><AgGridPaginationImage /></div>
      <div style={{marginBottom:"30px"}}><AgGridPagination /></div>
      <div style={{marginBottom:"30px"}}><TableFilter /></div>
      <div style={{marginBottom:"30px"}}><CustomFilterTable /></div>
    </>
  )
}

