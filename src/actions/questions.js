import {saveQuestion, saveAnswer} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const REMOVE_ANSWER = 'REMOVE_ANSWER'

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function removeAnswer(data){
  return{
    type: REMOVE_ANSWER,
    data
  }
}

function answerQuestion(data){
  return {
    type: ANSWER_QUESTION,
    data
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

function addQuestion(question){
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion (optionOne, optionTwo) {
  return (dispatch, getState) => {
    const {authedUser} = getState()

    dispatch(showLoading())
    return saveQuestion({
      author: authedUser,
      optionOne,
      optionTwo
    })
    .then((question) => dispatch(addQuestion(question)))
    .then(() => dispatch(hideLoading()))
  }
}