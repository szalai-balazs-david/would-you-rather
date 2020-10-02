import userEvent from '@testing-library/user-event'
import React, {Component} from 'react'
import {connect} from 'react-redux'

class AnsweredQuestion extends Component {
  
  render(){
    const {question, author, authedUser} = this.props
    const isOptionOne = question.optionOne.votes.includes(authedUser)
    const percForOptionOne = Math.round(100 * question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))

    return (
      <div className='question-overview'>
        <img 
          className='center-block'
          src={author.avatarURL}
          style={{width:100,height:100}}
          alt={author.name}
        />
        <p className='center'>{author.name} asks:</p>
        <p className='center'>Would you rather...</p>
        <div>
          <div className='option-detailed'>
            <p>{question.optionOne.text}</p>
            <p>Votes: {question.optionOne.votes.length} ({percForOptionOne}%)</p>
            {isOptionOne && <p className='selected'>Your answer</p>}
          </div>
          <div className='option-detailed'>
            <p>{question.optionTwo.text}</p>
            <p>Votes: {question.optionTwo.votes.length} ({100 - percForOptionOne}%)</p>
            {!isOptionOne && <p className='selected'>Your answer</p>}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({users, questions, authedUser}, {id}){
  const question = questions[id]
  const author = users[question.author]
  return {
    author,
    question,
    authedUser
  }
}

export default connect(mapStateToProps)(AnsweredQuestion)