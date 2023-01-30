import React from 'react'

import Button from '@mui/material/Button'

import style from '../Answer/Answer.module.scss'

type AnswerPropsType = {
  grades: string[]
  answer: string
  sendGrade: (grade: number) => void
  nextQuestion: () => void
  answerImg: string
}

export const Answer = (props: AnswerPropsType) => {
  return (
    <>
      <div className={style.answerBlock}>
        <span className={style.answerTitle}>Answer:</span>
        {(props.answerImg && <img className={style.answerImg} src={props.answerImg} />) || (
          <span>{props.answer}</span>
        )}
      </div>
      <div className={style.radioBlock}>
        <span className={style.rate}>Rate yourself:</span>
        {props.grades.map((g, i) => (
          <label key={'grade' + i} className={style.radio}>
            <input
              id={i + '-input-'}
              className={style.radioButton}
              type={'radio'}
              name={'name'}
              value={g}
              onChange={() => props.sendGrade(i)}
            />
            <span>{g}</span>
          </label>
        ))}
      </div>
      <div>
        <Button
          variant={'contained'}
          type={'button'}
          fullWidth
          disableRipple
          className={style.button}
          onClick={props.nextQuestion}
        >
          Next question
        </Button>
      </div>
    </>
  )
}
