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