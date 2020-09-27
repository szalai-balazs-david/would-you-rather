import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

class AnsweredQuestion extends Component {
  
  render(){
    const {question, author, authedUser} = this.props
    const isOptionOne = question.optionOne.votes.includes(authedUser)
    const percForOptionOne = Math.round(100 * question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))

    return (
      <table className='question'>
        <tbody>
          <tr>
            <td colSpan="2" className='question-cell'>Would you rather...</td>
          </tr>
          <tr>
            <td colSpan="2" className='question-cell'>
              <img 
                src={author.avatarURL}
                style={{width:100,height:100}}
              />
            </td>
          </tr>
          <tr>
            <td className='answer-cell'>
              <p>{question.optionOne.text}</p>
              <p>Votes: {question.optionOne.votes.length} ({percForOptionOne}%)</p>
              {isOptionOne && <p>Your answer</p>}
            </td>
            <td className='answer-cell'>
              <p>{question.optionTwo.text}</p>
              <p>Votes: {question.optionTwo.votes.length} ({100 - percForOptionOne}%)</p>
              {!isOptionOne && <p>Your answer</p>}
            </td>
          </tr>
        </tbody>
      </table>
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