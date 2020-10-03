import React, {Component} from 'react'
import {connect} from 'react-redux'
import QuestionOverview from './QuestionOverview'
import {answeredQuestionSelector, unansweredQuestionSelector} from '../utils/helpers'

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

function mapStateToProps(state){
  return {
    answeredQuestions: answeredQuestionSelector(state),
    unansweredQuestions: unansweredQuestionSelector(state)
  }
}

export default connect(mapStateToProps)(HomePage)