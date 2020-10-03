import { createSelector } from 'reselect'

const questionsSelector = state => Object.values(state.questions)
const authedUserSelector = state => state.authedUser

const sortedQuestionSelector = createSelector(
  questionsSelector,
  questions => questions.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
)

export const answeredQuestionSelector = createSelector(
  sortedQuestionSelector,
  authedUserSelector,
  (questions, authedUser) => questions
    .filter(q => q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser))
    .map(q => q.id)
)

export const unansweredQuestionSelector = createSelector(
  sortedQuestionSelector,
  answeredQuestionSelector,
  (questions, answered) => questions
    .filter(q => !answered.includes(q.id))
    .map(q => q.id)
)

const pointsSelector = (users) => Object.keys(users).map(id => {
  return {
    id,
    points: userAnswerPointSelector(users, id) + userQuestionPointSelector(users, id)
  }
})

export const pointRankingSelector = createSelector(
  pointsSelector,
  points => points
    .sort((a, b) => (a.points < b.points) ? 1 : -1)
    .map(x => x.id)
)

export const userRankSelector = (users, id) => pointRankingSelector(users).indexOf(id) + 1
export const userAnswerPointSelector = (users, id) => Object.values(users[id].answers).length
export const userQuestionPointSelector = (users, id) => users[id].questions.length