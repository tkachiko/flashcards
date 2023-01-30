import React from 'react'

import Button from '@mui/material/Button'

import style from '../Question/Question.module.scss'

type QuestionPropsType = {
  question: string
  shots: number
  showAnswer: boolean
  showButton: () => void
  questionImg: string
}

export const Question = (props: QuestionPropsType) => {
  return (
    <>
      <div className={style.question}>
        <span className={style.questionTitle}>Question:</span>
        {(props.questionImg && <img className={style.questionImg} src={props.questionImg} />) || (
          <span>{props.question}</span>
        )}
      </div>
      <div className={style.questionsShots}>
        <span>Quantity of answers on this question:</span>
        <span className={style.questionName}>{props.shots}</span>
      </div>
      {props.showAnswer && (
        <div>
          <Button
            variant={'contained'}
            type={'button'}
            fullWidth
            disableRipple
            className={style.button}
            onClick={props.showButton}
          >
            Show answer
          </Button>
        </div>
      )}
    </>
  )
}
