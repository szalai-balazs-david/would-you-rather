import React, {Component} from 'react'
import {connect} from 'react-redux'
import QuestionOverview from './QuestionOverview'

class HomePage extends Component {
  state = {
    showAnswered: true
  }

  onShowAnswered = (e) => {
    this.setState(() => ({
      showAnswered: true
    }))
  }

  onShowUnanswered = (e) => {
    this.setState(() => ({
      showAnswered: false
    }))
  }

  render(){
    const {answeredQuestions, unansweredQuestions} = this.props
    const {showAnswered} = this.state
    const questions = showAnswered ? answeredQuestions : unansweredQuestions
    return (
      <div>
        <button onClick={this.onShowAnswered}>Show Answered</button>
        <button onClick={this.onShowUnanswered}>Show Unanswered</button>
        {questions.map(q => <QuestionOverview key={q} id={q}/>)}
      </div>
    )
  }
}

function mapStateToProps({authedUser, questions}){
  const questionValues = Object.values(questions)
  const answeredQuestions = questionValues
    .filter(q => q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser))
    .map(q => q.id)
  const unansweredQuestions = questionValues
    .filter(q => !answeredQuestions.includes(q.id))
    .map(q => q.id)
  return {
    answeredQuestions,
    unansweredQuestions
  }
}

export default connect(mapStateToProps)(HomePage)