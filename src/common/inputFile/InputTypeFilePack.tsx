import React, { ChangeEvent, SetStateAction, useState, Dispatch } from 'react'

import Button from '@mui/material/Button'

import s from './InputTypeFile.module.scss'
type Props = {
  setImage: Dispatch<SetStateAction<string>>
}
export const InputTypeFilePack = (props: Props) => {
  const [ava, setAva] = useState('')
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          props.setImage(file64)
          setAva(file64)
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

  return (
    <>
      <label className={s.container}>
        <p className={s.p}>Cover</p>
        <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
        <Button variant="text" component="span" className={s.button}>
          Change cover
        </Button>
      </label>
      <img src={ava} className={s.image}  />
    </>
  )
}
