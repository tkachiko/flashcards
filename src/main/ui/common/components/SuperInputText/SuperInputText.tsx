import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
} from 'react'
import style from './SuperInputText.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: ReactNode
  spanClassName?: string
  type: string
}

export const SuperInputText: React.FC<SuperInputTextPropsType> = (
  {
    onChange,
    onChangeText,
    onKeyDown,
    onEnter,
    error,
    className,
    spanClassName,
    id,
    type,

    ...restProps // все остальные пропсы попадут в объект restProps
  },
) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e) // если есть пропс onChange, то передать ему е (поскольку onChange не обязателен)

    onChangeText?.(e.currentTarget.value)
  }
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e)

    onEnter && // если есть пропс onEnter
    e.key === 'Enter' && // и если нажата кнопка Enter
    onEnter() // то вызвать его
  }

  const finalSpanClassName = style.error
    + (spanClassName ? ' ' + spanClassName : '')
  const finalInputClassName = style.input
    + (error ? ' ' + style.errorInput : ' ' + style.superInput)
    + (className ? ' ' + style.className : '')

  return (
    <div className={style.inputWrapper}>
      <input
        id={id}
        type={type}
        onChange={onChangeCallback}
        onKeyDown={onKeyPressCallback}
        className={finalInputClassName}
        {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
      />
      <span
        id={id ? id + '-span' : undefined}
        className={finalSpanClassName}
      >
                {error}
            </span>
    </div>
  )
}