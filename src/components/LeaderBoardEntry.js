import React, {Component} from 'react'
import {connect} from 'react-redux'
import {userRankSelector, userAnswerPointSelector, userQuestionPointSelector} from '../utils/helpers'

class LeaderboardEntry extends Component {
  render(){
    const {user, answers, questions, position} = this.props

    return (
      <div className={
        position === 1 ? 'leaderboard-first' : 
        position === 2 ? 'leaderboard-second' :
        position === 3 ? 'leaderboard-third' : 'leaderboard-entry'}>
        <img 
          className='leaderboard-image'
          src={user.avatarURL}
          alt={user.name}
        />
        <p>{position}.: {user.name}</p>
        <ul>
          <li>Points: {questions + answers}</li>
          <li>Questions created: {questions}</li>
          <li>Questions answered: {answers}</li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps({users}, {id}){
  const user = users[id]
  return {
    user,
    answers: userAnswerPointSelector(users, id),
    questions: userQuestionPointSelector(users, id),
    position: userRankSelector(users, id)
  }
}

export default connect(mapStateToProps)(LeaderboardEntry)