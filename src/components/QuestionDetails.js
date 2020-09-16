import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

class QuestionDetails extends Component {
  onOptionOne = (e) => {
    console.log(`Dispatch Option1 for ${this.props.question.id} by ${this.props.authedUser}`)
  }

  onOptionTwo = (e) => {
    console.log(`Dispatch Option2 for ${this.props.question.id} by ${this.props.authedUser}`)
  }

  render(){
    const {question, author, answered, isOptionOne} = this.props
    return (
      <div>
        <p>{author.name} asks:</p>
        <p>Would you rather...</p>
        <button onClick={this.onOptionOne} disabled={answered}>{question.optionOne.text}{answered && isOptionOne && 'Selected'}</button>
        <button onClick={this.onOptionTwo} disabled={answered}>{question.optionTwo.text}{answered && !isOptionOne && 'Selected'}</button>
      </div>
    )
  }
}

function mapStateToProps({users, questions, authedUser}, props){
  const {id} = props.match.params
  const question = questions[id]
  const author = users[question.author]
  const answered = question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
  const isOptionOne = question.optionOne.votes.includes(authedUser)
  return {
    author,
    question,
    authedUser,
    answered,
    isOptionOne
  }
}

export default connect(mapStateToProps)(QuestionDetails)