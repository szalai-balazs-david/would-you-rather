import React, {Component} from 'react'
import {connect} from 'react-redux'

class Question extends Component {
  render(){
    const {question, author} = this.props
    return (
      <div>
        <p>{author.name} asks:</p>
        <p>Would you rather...</p>
        <p>{question.optionOne.text}</p>
        <p>{question.optionTwo.text}</p>
      </div>
    )
  }
}

function mapStateToProps({users, questions}, {id}){
  const question = questions[id]
  const author = users[question.author]
  return {
    author,
    question
  }
}

export default connect(mapStateToProps)(Question)