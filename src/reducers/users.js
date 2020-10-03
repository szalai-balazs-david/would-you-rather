import {RECEIVE_USERS, ADD_QUESTION, ANSWER_QUESTION, REMOVE_ANSWER} from '../actions/types'

export default function users (state = {}, action){
  switch(action.type){
    case RECEIVE_USERS:
      return{
        ...state,
        ...action.users
      }
    case ANSWER_QUESTION:
      return addAnsweredQuestion(state, action)
    case REMOVE_ANSWER:
      return removeAnsweredQuestion(state, action)
    case ADD_QUESTION:
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
  console.log(action)
  const {author, id} = action.question

  return{
    ...state,
    [author]:{
      ...state[author],
      questions: state[author].questions.concat(id)
    }
  }
}