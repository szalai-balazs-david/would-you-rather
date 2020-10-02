import React, {Component} from 'react'
import {connect} from 'react-redux'
import AnsweredQuestion from './AnsweredQuestion'
import NotFound from './NotFound'
import QuestionDetails from './QuestionDetails'

class Question extends Component {
  render(){
    if(this.props.notFound){
      return <NotFound />
    }

    if(this.props.answered){
      return <AnsweredQuestion id={this.props.question.id} />
    }

    return <QuestionDetails id={this.props.question.id} />
  }
}

function mapStateToProps({questions, authedUser}, props){
  const {id} = props.match.params
  if(!(id in questions)){
    return {
      notFound: true
    }
  }
  const question = questions[id]
  const answered = question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
  return {
    question,
    answered,
    notFound: false
  }
}

export default connect(mapStateToProps)(Question)