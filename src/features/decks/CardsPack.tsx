import * as React from 'react'
import { useEffect } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../app/store'

import { ActionSetting } from './ActionSetting/ActionSetting'
import { addPackTC, fetchPacks, packSelector } from './cardsPack-reducer'

export const CardsPack = () => {
  const pack = useAppSelector(packSelector)
  const dispatch = useAppDispatch()

  console.log(pack)
  useEffect(() => {
    dispatch(fetchPacks())
  }, [])

  const onClick = () => {
    dispatch(addPackTC('вфывф'))
  }

  return (
    <>
      <button onClick={onClick}>add pack</button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pack?.cardPacks.map((el, i) => (
              <TableRow
                key={`${el._id}-${i}`}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {el.name}
                </TableCell>
                <TableCell align="right">{el.cardsCount}</TableCell>
                <TableCell align="right">{el.updated}</TableCell>
                <TableCell align="right">{el.created}</TableCell>
                <TableCell align="right">
                  <ActionSetting />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
