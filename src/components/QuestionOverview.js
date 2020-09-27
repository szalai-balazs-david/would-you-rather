import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

class QuestionOverview extends Component {
  state = {
    redirect: false
  }

  handleClick = (e) => {
    e.preventDefault()
    
    this.setState(() => ({
      redirect: true
    }))
  }

  render(){
    const {question, author} = this.props

    if(this.state.redirect){
      return <Redirect to={`/question/${question.id}`} />
    }

    return (
      <div onClick={this.handleClick}>
        <img 
          src={author.avatarURL}
          style={{width:100,height:100}}
        />
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

export default connect(mapStateToProps)(QuestionOverview)