import React, {Component} from 'react'
import {connect} from 'react-redux'
import QuestionOverview from './QuestionOverview'

class HomePage extends Component {
  state = {
    showAnswered: false
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
        <div className='center-block'>
          <button 
            className='question-group-selector' 
            onClick={this.onShowAnswered}
            disabled={this.state.showAnswered}
          >
              Show Answered
          </button>
          <button 
            className='question-group-selector' 
            onClick={this.onShowUnanswered}
            disabled={!this.state.showAnswered}
          >
              Show Unanswered
          </button>
        </div>
        {questions.map(q => <QuestionOverview key={q} id={q}/>)}
      </div>
    )
  }
}

function mapStateToProps({authedUser, questions}){
  const questionValues = Object.values(questions)
  const sortedQuestions = questionValues.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1)
  const answeredQuestions = sortedQuestions
    .filter(q => q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser))
    .map(q => q.id)
  const unansweredQuestions = sortedQuestions
    .filter(q => !answeredQuestions.includes(q.id))
    .map(q => q.id)
  return {
    answeredQuestions,
    unansweredQuestions
  }
}

export default connect(mapStateToProps)(HomePage)