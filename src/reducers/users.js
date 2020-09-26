import { connectAdvanced } from 'react-redux'
import {RECEIVE_USERS, ADD_ANSWERED_QUESTION, REMOVE_ANSWERED_QUESTION} from '../actions/users'

export default function users (state = {}, action){
  switch(action.type){
    case RECEIVE_USERS:
      return{
        ...state,
        ...action.users
      }
    case ADD_ANSWERED_QUESTION:
      return addAnsweredQuestion(state, action)
    case REMOVE_ANSWERED_QUESTION:
      return removeAnsweredQuestion(state, action)
    default:
      return state
  }
}

function addAnsweredQuestion(state, action){
  const {data} = action
  return{
    ...state,
    [data.authedUser]:{
      ...state[data.authedUser],
      questions: state[data.authedUser].questions.concat(data.qid)
    }
  }
}

function removeAnsweredQuestion(state, action){
  const {data} = action
  return{
    ...state,
    [data.authedUser]:{
      ...state[data.authedUser],
      questions: state[data.authedUser].questions.filter(x => x !== data.qid)
    }
  }
}