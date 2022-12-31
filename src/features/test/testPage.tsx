import React from 'react'
import {SuperButton} from '../../main/ui/common/SuperButton/SuperButton'
import {SuperRange} from '../../main/ui/common/SuperRange/SuperRange'
import {SuperCheckbox} from '../../main/ui/common/SuperCheckbox/SuperCheckbox'
import {SuperEditableSpan} from '../../main/ui/common/SuperEditableSpan/SuperEditableSpan'
import {SuperInputText} from '../../main/ui/common/SuperInputText/SuperInputText'
import {SuperRadio} from '../../main/ui/common/SuperRadio/SuperRadio'
import {SuperSelect} from '../../main/ui/common/SuperSelect/SuperSelect'
import {SuperSort} from '../../main/ui/common/SuperSort/SuperSort'

export const TestPage = () => {
  return (
    <div>
      <SuperButton />
      <SuperCheckbox />
      <SuperEditableSpan />
      <SuperInputText />
      <SuperRadio />
      <SuperRange />
      <SuperSelect />
      <SuperSort sort={'1'} value={'1'} onChange={() => {
      }} />
    </div>
  )
}