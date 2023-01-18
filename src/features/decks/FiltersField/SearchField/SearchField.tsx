import React from 'react'

import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'

import search from '../../../../assets/images/search.svg'
import style from '../SearchField/SearchField.module.scss'

export const SearchField = () => {
  return (
    <div className={style.wrapper}>
      <FormControl sx={{ m: 1, margin: '0 0' }} variant="outlined">
        <InputLabel htmlFor="search for packs">Search</InputLabel>
        <OutlinedInput
          id="search for packs"
          startAdornment={
            <InputAdornment position="start">
              <img className={style.img} src={search}></img>
            </InputAdornment>
          }
          label="Search"
          value=""
        />
      </FormControl>
    </div>
  )
}
