import React, { ChangeEvent, useState } from 'react'

import Button from '@mui/material/Button'

import react from '../../assets/icons/Mask.svg'

export const InputTypeFile = () => {
  const [ava, setAva] = useState(react)
  const [isAvaBroken, setIsAvaBroken] = useState(false)

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          // setAva(file64)
          setAva('111')
        })
      } else {
        console.error('Error: ', 'Файл слишком большого размера')
      }
    }
  }

  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      const file64 = reader.result as string

      callBack(file64)
    }
    reader.readAsDataURL(file)
  }

  const errorHandler = () => {
    setIsAvaBroken(true)
    alert('Кривая картинка')
  }

  return (
    <div>
      <img
        src={isAvaBroken ? react : ava}
        style={{ width: '100px' }}
        onError={errorHandler}
        alt="ava"
      />
      <label>
        <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
        <Button variant="contained" component="span">
          Field button
        </Button>
      </label>
    </div>
  )
}
