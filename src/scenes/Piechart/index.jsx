import React from 'react'
import { Header } from '../../components/Header'
import { PiechartActivity } from '../../data/PieChart'
import { Box } from '@mui/material'
export const PiechartPage = () => {
  return (
    <>
      <Header title="Pie Charts" subtitle="Pie Chart for employee activity" />

      <Box>
        <PiechartActivity/>
      </Box>
    </>
  )
}
