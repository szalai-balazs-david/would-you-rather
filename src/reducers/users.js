import {RECEIVE_USERS, ADD_ANSWERED_QUESTION, REMOVE_ANSWERED_QUESTION, ADD_NEW_QUESTION} from '../actions/users'

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
      case ADD_NEW_QUESTION:
        return addNewQuestion(state, action)
    default:
      return state
  }
}

function addAnsweredQuestion(state, action){
  const {qid, authedUser} = action.data
  const answer = {}
  answer[qid] = action.data.answer
  return{
    ...state,
    [authedUser]:{
      ...state[authedUser],
      answers: {
        ...state[authedUser].answers,
        ...answer
      }
    }
  }
}

function removeAnsweredQuestion(state, action){
  const {authedUser, qid} = action.data

  const {[qid]: omit, ...answers} = state[authedUser].answers

  return{
    ...state,
    [authedUser]:{
      ...state[authedUser],
      answers
    }
  }
}

function addNewQuestion(state, action){
  const {authedUser, qid} = action.data

  return{
    ...state,
    [authedUser]:{
      ...state[authedUser],
      questions: state[authedUser].questions.concat(qid)
    }
  }
}