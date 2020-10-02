import React, {Component} from 'react'
import {connect} from 'react-redux'

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

function mapStateToProps({users}, {id, position}){
  const user = users[id]
  const answers = Object.values(user.answers).length
  const questions = user.questions.length
  return {
    user,
    answers,
    questions,
    position
  }
}

export default connect(mapStateToProps)(LeaderboardEntry)