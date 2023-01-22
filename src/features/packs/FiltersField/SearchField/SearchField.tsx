import React, { ChangeEvent } from 'react'

import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'

import search from '../../../../assets/images/search.svg'
import style from '../SearchField/SearchField.module.scss'

type SearchFieldType = {
  search: string
  handleChangeSearch: (search: string) => void
}

export const SearchField = (props: SearchFieldType) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.handleChangeSearch(event.target.value)
  }

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
          value={props.search}
          onChange={handleChange}
        />
      </FormControl>
    </div>
  )
}
