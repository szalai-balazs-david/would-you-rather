export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_ANSWERED_QUESTION = 'ADD_ANSWERED_QUESTION'
export const REMOVE_ANSWERED_QUESTION = 'REMOVE_ANSWERED_QUESTION'
export const ADD_NEW_QUESTION = 'ADD_NEW_QUESTION'

export function receiveUsers (users) {
  return {
    type: RECEIVE_USERS,
    users,
  }
} 

export function addAnsweredQuestion (data) {
  return {
    type: ADD_ANSWERED_QUESTION,
    data
  }
} 

export function removeAnsweredQuestion (data) {
  return {
    type: REMOVE_ANSWERED_QUESTION,
    data
  }
} 

export function addNewQuestion (data) {
  return {
    type: ADD_NEW_QUESTION,
    data
  }
} 