import {RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION, REMOVE_ANSWER} from '../actions/types'

export default function tweets (state = {}, action){
  switch(action.type){
    case RECEIVE_QUESTIONS:
      return{
        ...state,
        ...action.questions
      }
    case ANSWER_QUESTION:
      console.log(action)
      const {data} = action
      return{
        ...state,
        [data.qid]: {
          ...state[data.qid],
          [data.answer]: {
            ...state[data.qid][data.answer],
            votes: state[data.qid][data.answer].votes.concat([data.authedUser])
          }
        }
      }
    case REMOVE_ANSWER:
      return{
        ...state,
        [action.qid]: {
          ...state[action.qid],
          optionOne: {
            ...state[action.qid]['optionOne'],
            votes: state[action.qid]['optionOne'].votes.filter(x => x !== action.authedUser)
          },
          optionTwo: {
            ...state[action.qid]['optionTwo'],
            votes: state[action.qid]['optionTwo'].votes.filter(x => x !== action.authedUser)
          }
        }
      }
    case ADD_QUESTION:
      const {question} = action
      return{
        ...state,
        [question.id]: question,
      }
    default:
      return state
  }
}