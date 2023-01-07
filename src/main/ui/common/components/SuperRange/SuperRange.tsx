import React, { ChangeEvent, FC } from 'react'

type PropsType = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  value: number
}

export const SuperRange: FC<PropsType> = props => {
  return (
    <div>
      <input
        type={'range'}
        style={{
          color: '#00CC22',
          width: '150px',
        }}
        value={props.value}
        onChange={props.onChange}
      />
      <span>{props.value}</span>
    </div>
  )
}
