import React, {Component} from 'react'
import {connect} from 'react-redux'

class LeaderboardEntry extends Component {
  render(){
    const {user, answers, questions} = this.props

    return (
      <div>
        <p>{user.name}</p>
        <img 
          src={user.avatarURL}
          style={{width:100,height:100}}
          alt={user.name}
        />
        <p>Points: {questions + answers}</p>
        <p>Questions created: {questions}</p>
        <p>Questions answered: {answers}</p>
      </div>
    )
  }
}

function mapStateToProps({users}, {id}){
  const user = users[id]
  const answers = Object.values(user.answers).length
  const questions = user.questions.length
  return {
    user,
    answers,
    questions
  }
}

export default connect(mapStateToProps)(LeaderboardEntry)