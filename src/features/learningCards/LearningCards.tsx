import React, { useEffect, useState } from 'react'

import { useParams, useSearchParams } from 'react-router-dom'

import { RootStateType, useAppDispatch, useAppSelector } from '../../app/store'
import { Back2Packs } from '../../common/components/Back2Packs/Back2Packs'
import styleContainer from '../../common/styles/Container.module.scss'
import { CardType } from '../../common/types/types'
import { fetchCards, packNameSelector, setGrade } from '../cards/cards-reducer'
import style from '../learningCards/LearningCards.module.scss'

import { Answer } from './Answer/Answer'
import { currentGradeSelector, setGradeAC } from './learnCards-reducer'
import { Question } from './Question/Question'

const getCard = (cards: CardType[]) => {
  const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0)
  const rand = Math.random() * sum
  const res = cards.reduce(
    (acc: { sum: number; id: number }, card, i) => {
      const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)

      return { sum: newSum, id: newSum < rand ? i : acc.id }
    },
    { sum: 0, id: -1 }
  )

  return cards[res.id + 1]
}

const grades = ['Did not know', 'Forgot', 'Confused', 'Thinking a lot', 'Knew the answer']

export const LearningCards = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const { cardsPack_id } = useParams()
  const { cardsData, packId } = useAppSelector((state: RootStateType) => state.cards)
  const packName = useAppSelector(packNameSelector)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [first, setFirst] = useState<boolean>(true)
  const currentGrade = useAppSelector(currentGradeSelector)
  const [showAnswer, setShowAnswer] = useState(true)

  const showButtonHandler = () => {
    setIsChecked(true)
    setShowAnswer(false)
  }

  const [card, setCard] = useState<CardType>({
    _id: 'fake',
    cardsPack_id: '',
    answer: '',
    question: '',
    grade: 0,
    shots: 0,
    type: '',
    rating: 0,
    created: '',
    updated: '',
    user_id: '',
    __v: 0,
    answerImg: '',
    questionImg: '',
  })

  useEffect(() => {
    setSearchParams({
      packId: cardsPack_id ? cardsPack_id : '',
    })
    const params = Object.fromEntries(searchParams)

    if (first) {
      dispatch(
        fetchCards({
          cardsPack_id: params.packId || packId,
        })
      )
      setFirst(false)
    }
    if (cardsData.cards.length > 0) {
      setCard(getCard(cardsData.cards))
    }

    return () => {
      console.log('LearnContainer useEffect off')
    }
  }, [dispatch, cardsPack_id, cardsData.cards, first])

  const onNext = () => {
    setIsChecked(false)
    setShowAnswer(true)

    if (cardsData.cards.length > 0) {
      dispatch(setGrade({ grade: currentGrade, card_id: card._id }))
      setCard(getCard(cardsData.cards))
    }
  }

  const sendGrade = (grade: number) => {
    dispatch(setGradeAC({ grade: grade + 1 }))
  }

  return (
    <div className={`${style.container} ${styleContainer.container}`}>
      <Back2Packs />
      <div className={style.learningBlock}>
        <h2>Learn &quot;{packName}&quot;</h2>
        <div className={style.questionBlock}>
          <Question
            question={card.question}
            shots={card.shots}
            showAnswer={showAnswer}
            showButton={showButtonHandler}
            questionImg={card.questionImg}
          />
          {isChecked && (
            <Answer
              grades={grades}
              answer={card.answer}
              sendGrade={sendGrade}
              nextQuestion={onNext}
              answerImg={card.answerImg}
            />
          )}
        </div>
      </div>
    </div>
  )
}
