import { getInitialData, saveAnswer, saveQuestion } from '../utils/api'
import { receiveUsers, addAnsweredQuestion, addNewQuestion } from '../actions/users'
import { receiveQuestions,answerQuestion, removeAnswer, addQuestion } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import {showLoading, hideLoading} from 'react-redux-loading'

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
    dispatch(addAnsweredQuestion({qid, authedUser, answer}))
    
    return saveAnswer({
      authedUser,
      qid,
      answer
    })
    .catch((e) => {
      console.warn('Error in handleAnswerQuestion: ', e)
      dispatch(removeAnswer({qid, authedUser}))
      dispatch(addAnsweredQuestion({qid, authedUser}))
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
      dispatch(addNewQuestion({authedUser, qid: question.id}))
    })
    .then(() => dispatch(hideLoading()))
  }
}