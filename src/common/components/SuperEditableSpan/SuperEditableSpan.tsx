import React, { DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState } from 'react'

import { SuperInputText } from '../SuperInputText/SuperInputText'

import editIcon from './editIcon.svg'
import style from './SuperEditableSpan.module.scss'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
// тип пропсов обычного спана
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperEditableSpanType = Omit<DefaultInputPropsType, 'type'> & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: string
  type: string
  labelValue?: string
  onClick?: () => void
  disabled: boolean

  spanProps?: DefaultSpanPropsType & { defaultText?: string } // пропсы для спана
}

export const SuperEditableSpan: React.FC<SuperEditableSpanType> = ({
  autoFocus,
  onBlur,
  onEnter,
  spanProps,
  type,
  labelValue,
  onClick,
  disabled,

  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const { children, onDoubleClick, className, defaultText, ...restSpanProps } = spanProps || {}

  const onEnterCallback = () => {
    setEditMode(false)
    onEnter?.()
  }
  const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
    setEditMode(false)
    onBlur?.(e)
  }
  const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setEditMode(true)
    onDoubleClick?.(e)
  }

  const spanClassName = style.span + (className ? ' ' + className : '')
  const disabledButton = style.disabledButton
  const btnClassName = style.saveButton + (disabled ? ' ' + disabledButton : '')

  return (
    <>
      {editMode ? (
        <>
          <label className={style.label}>{labelValue}</label>
          <div className={style.inputBlock}>
            <SuperInputText
              type={type}
              autoFocus={autoFocus || true}
              onBlur={onBlurCallback}
              onEnter={onEnterCallback}
              disabled={false}
              {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            <button disabled={disabled} onClick={onClick} className={btnClassName}>
              SAVE
            </button>
          </div>
        </>
      ) : (
        <div className={style.spanBlock}>
          <span onDoubleClick={onDoubleClickCallBack} className={spanClassName} {...restSpanProps}>
            {/*если нет захардкодженного текста для спана, то значение инпута*/}
            {children || restProps.value || defaultText}
          </span>
          <img src={editIcon} className={style.pen} alt={'edit'} />
        </div>
      )}
    </>
  )
}
