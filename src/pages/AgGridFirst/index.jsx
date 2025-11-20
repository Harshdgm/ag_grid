import React from 'react'
import AgGrid from '../../components/AgGrid/AgGrid'
import ExternalFilter from '../../components/ExternalFilter/ExternalFilter'

export default function index() {
  return (
    <div>
        <div><ExternalFilter /></div>
        <div>
          <p>AgGrid without pagination process</p>
          <AgGrid />
        </div>
    </div>
  )
}
