import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './SuperButton.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
}

export const SuperButton: React.FC<SuperButtonPropsType> = ({
  xType,
  className,
  disabled,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  let finalClassName: string

  if (disabled) {
    finalClassName = s.button + ' ' + s.disabled + (className ? ' ' + className : '')
  } else {
    if (s.button + ' ' + xType === 'red') {
      finalClassName = s.red
    } else {
      finalClassName =
        xType === 'secondary' ? s.secondary : s.default + (className ? ' ' + className : '')
    }
  }

  return (
    <button
      disabled={disabled}
      className={finalClassName}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  )
}
