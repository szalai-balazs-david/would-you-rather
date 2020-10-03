import { getInitialData, saveAnswer, saveQuestion } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveQuestions } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import {showLoading, hideLoading} from 'react-redux-loading'
import {ADD_QUESTION, ANSWER_QUESTION, REMOVE_ANSWER} from '../actions/types'

export function removeAnswer(data){
  return{
    type: REMOVE_ANSWER,
    data
  }
}

export function answerQuestion(data){
  return {
    type: ANSWER_QUESTION,
    data
  }
}

export function addQuestion(question){
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(''))
        dispatch(hideLoading())
      })
  }
} 

export function handleAnswerQuestion (qid, isOptionOne) {
  return (dispatch, getState) => {
    const {authedUser} = getState()
    const answer = isOptionOne ? 'optionOne' : 'optionTwo'

    dispatch(answerQuestion({qid, authedUser, answer}))
    
    return saveAnswer({
      authedUser,
      qid,
      answer
    })
    .catch((e) => {
      console.warn('Error in handleAnswerQuestion: ', e)
      dispatch(removeAnswer({qid, authedUser}))
      alert('There was an error answering the question. Try again.')
    })
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const {authedUser} = getState()

    dispatch(showLoading())
    return saveQuestion({
      author: authedUser,
      optionOneText,
      optionTwoText
    })
    .then((question) => {
      dispatch(addQuestion(question))
    })
    .then(() => dispatch(hideLoading()))
  }
}