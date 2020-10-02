import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleAnswerQuestion} from '../actions/shared'

class QuestionDetails extends Component {
  onOptionOne = (e) => {
    e.preventDefault()
    const {dispatch} = this.props
    dispatch(handleAnswerQuestion(this.props.question.id, true))
  }

  onOptionTwo = (e) => {
    e.preventDefault()
    const {dispatch} = this.props
    dispatch(handleAnswerQuestion(this.props.question.id, false))
  }

  render(){
    const {question, author} = this.props

    return (
      <div>
        <img 
          className='center-block'
          src={author.avatarURL}
          style={{width:100,height:100}}
          alt={author.name}
        />
        <p className='center'>{author.name} asks:</p>
        <p className='center'>Would you rather...</p>
        <button className='option-button' onClick={this.onOptionOne}>{question.optionOne.text}</button>
        <button className='option-button' onClick={this.onOptionTwo}>{question.optionTwo.text}</button>
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
    authedUser,
  }
}

export default connect(mapStateToProps)(QuestionDetails)