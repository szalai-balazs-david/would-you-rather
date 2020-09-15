import React, {Component} from 'react'
import {connect} from 'react-redux'

class QuestionToAnswer extends Component {
  onOptionOne = (e) => {
    console.log(`Dispatch Option1 for ${this.props.question.id} by ${this.props.authedUser}`)
  }

  onOptionTwo = (e) => {
    console.log(`Dispatch Option2 for ${this.props.question.id} by ${this.props.authedUser}`)
  }

  render(){
    const {question, author} = this.props
    return (
      <div>
        <p>{author.name} asks:</p>
        <p>Would you rather...</p>
        <button onClick={this.onOptionOne}>{question.optionOne.text}</button>
        <button onClick={this.onOptionTwo}>{question.optionTwo.text}</button>
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

export default connect(mapStateToProps)(QuestionToAnswer)