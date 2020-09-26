import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {handleAnswerQuestion} from '../actions/shared'

class QuestionDetails extends Component {
  state = {
    toHome: false
  }
  onOptionOne = (e) => {
    e.preventDefault()
    console.log(`Dispatch Option1 for ${this.props.question.id} by ${this.props.authedUser}`)

    const {dispatch} = this.props
    dispatch(handleAnswerQuestion(this.props.question.id, true))
    this.setState(() => ({
      toHome: true
    }))
  }

  onOptionTwo = (e) => {
    e.preventDefault()
    console.log(`Dispatch Option2 for ${this.props.question.id} by ${this.props.authedUser}`)

    const {dispatch} = this.props
    dispatch(handleAnswerQuestion(this.props.question.id, false))
    this.setState(() => ({
      toHome: true
    }))
  }

  render(){
    const {toHome} = this.state
    if(toHome){
      return <Redirect to='/' />
    }

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