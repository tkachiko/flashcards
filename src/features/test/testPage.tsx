import React, { ChangeEvent, useState } from 'react'

import { SuperButton } from '../../common/components/SuperButton/SuperButton'
import { SuperCheckbox } from '../../common/components/SuperCheckbox/SuperCheckbox'
import { SuperEditableSpan } from '../../common/components/SuperEditableSpan/SuperEditableSpan'
import { SuperInputText } from '../../common/components/SuperInputText/SuperInputText'
import { SuperRadio } from '../../common/components/SuperRadio/SuperRadio'
import { SuperSelect } from '../../common/components/SuperSelect/SuperSelect'
import { SuperSort } from '../../common/components/SuperSort/SuperSort'
import styleContainer from '../../common/styles/Container.module.scss'

import style from './TestPage.module.css'

export const TestPage = () => {
  const [value, onChangeOption] = useState(1)
  const [inputValue, setInputValue] = useState<string>('')
  const [stateForAllInputs, setValue] = useState<string>('')
  const [rangeValue, setRangeValue] = useState<number>(0)

  const change = (e: ChangeEvent<HTMLInputElement>) => {
    setRangeValue(+e.currentTarget.value)
  }

  const [stateForAllCheckboxes, setChecked] = useState<boolean>(false)

  return (
    <div className={`${styleContainer.container}`}>
      <div className={style.testPage}>
        <SuperButton>I am a button</SuperButton>
        <SuperCheckbox checked={stateForAllCheckboxes} onChangeChecked={setChecked}>
          Some text
        </SuperCheckbox>
        <SuperEditableSpan
          type={'text'}
          spanProps={{
            id: 'hw6-editable-span',
            defaultText: 'enter text...',
          }}
          value={inputValue}
          onChangeText={setInputValue}
          isDisabled={false}
        />
        <SuperInputText
          type={'text'}
          value={stateForAllInputs}
          onChange={e => setValue(e.currentTarget.value)}
        />
        <SuperRadio
          options={[
            { id: 1, value: 'React' },
            { id: 2, value: 'Redux' },
            { id: 3, value: 'TypeScript' },
          ]}
          value={value}
          onChangeOption={onChangeOption}
        />
        <SuperSelect
          options={[
            { id: 1, value: 'React' },
            { id: 2, value: 'Redux' },
            { id: 3, value: 'TypeScript' },
          ]}
          value={value}
          onChangeOption={onChangeOption}
        />
        <SuperSort sort={'1'} value={'1'} onChange={() => {}} />
      </div>
    </div>
  )
}
