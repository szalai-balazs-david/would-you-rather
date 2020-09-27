import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {handleAnswerQuestion} from '../actions/shared'
import AnsweredQuestion from './AnsweredQuestion'
import NotFound from './NotFound'

class QuestionDetails extends Component {
  onOptionOne = (e) => {
    e.preventDefault()
    console.log(`Dispatch Option1 for ${this.props.question.id} by ${this.props.authedUser}`)

    const {dispatch} = this.props
    dispatch(handleAnswerQuestion(this.props.question.id, true))
  }

  onOptionTwo = (e) => {
    e.preventDefault()
    console.log(`Dispatch Option2 for ${this.props.question.id} by ${this.props.authedUser}`)

    const {dispatch} = this.props
    dispatch(handleAnswerQuestion(this.props.question.id, false))
  }

  render(){
    if(this.props.notFound){
      return <NotFound />
    }

    const {question, author, answered, isOptionOne} = this.props
    if(answered){
      return <AnsweredQuestion id={question.id} />
    }

    return (
      <div>
        <p>Would you rather...</p>
        <img 
          src={author.avatarURL}
          style={{width:100,height:100}}
        />
        <button onClick={this.onOptionOne} disabled={answered}>{question.optionOne.text}{answered && isOptionOne && 'Selected'}</button>
        <button onClick={this.onOptionTwo} disabled={answered}>{question.optionTwo.text}{answered && !isOptionOne && 'Selected'}</button>
      </div>
    )
  }
}

function mapStateToProps({users, questions, authedUser}, props){
  const {id} = props.match.params
  if(!(id in questions)){
    return {
      notFound: true
    }
  }
  const question = questions[id]
  const author = users[question.author]
  const answered = question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
  const isOptionOne = question.optionOne.votes.includes(authedUser)
  return {
    author,
    question,
    authedUser,
    answered,
    isOptionOne,
    notFound: false
  }
}

export default connect(mapStateToProps)(QuestionDetails)