import React from 'react'

import down from '../../../assets/icons/down.png'
import up from '../../../assets/icons/up.png'
import updown from '../../../assets/icons/updown.png'

const downIcon = down
const upIcon = up
const noneIcon = updown

export type SuperSortPropsType = {
  id?: string
  sort: string
  value: string
  onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
  if (sort === '') {
    return down
  } else {
    if (sort === down) {
      return up
    } else {
      return sort === up ? '' : down
    }
  }
}

export const SuperSort: React.FC<SuperSortPropsType> = ({ sort, value, onChange, id = 'hw15' }) => {
  const up = '0' + value
  const down = '1' + value

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up))
  }

  let icon: any

  if (sort === down) {
    icon = downIcon
  } else {
    icon = sort === up ? upIcon : noneIcon
  }

  return (
    <span id={id + '-sort-' + value} onClick={onChangeCallback}>
      <img id={id + '-icon-' + sort} src={icon} alt={'up or down'} />
    </span>
  )
}
