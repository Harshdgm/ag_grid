import React from 'react'
import AgGridPagination from '../../components/AgGridPagination/AgGridPagination'
import AgGridPaginationImage from '../../components/AgGridPaginationImage/AgGridPaginationImage'
import AggregationTable from '../../components/AggregationTable/AggregationTable'
import TableFilter from '../../components/TableFilter/TableFilter'
import CustomFilterTable from '../../components/CustomFilterTable/CustomFilterTable'

export default function index() {
  return (
    <>
      <div><AgGridPaginationImage /></div>
      <div><AgGridPagination /></div>
      <div><AggregationTable /></div>
      <div><TableFilter /></div>
      <div><CustomFilterTable /></div>
    </>
  )
}

