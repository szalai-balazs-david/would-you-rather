import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {handleAddQuestion} from '../actions/shared'

class CreateQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false,
  }

  handleChangeOptionOne = (e) => {
    const optionOne = e.target.value

    this.setState(() => ({
      optionOne
    }))
  }

  handleChangeOptionTwo = (e) => {
    const optionTwo = e.target.value

    this.setState(() => ({
      optionTwo
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const {optionOne, optionTwo} = this.state
    const {dispatch} = this.props

    dispatch(handleAddQuestion(optionOne, optionTwo))

    this.setState(() => ({
      optionOne: '',
      optionTwo: '',
      toHome: true
    }))
  }

  render(){
    const {optionOne, optionTwo, toHome} = this.state

    if(toHome){
      return <Redirect to='/' />
    }

    return (
      <div>
        <h3>Would you rather</h3>
        <form onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Option One"
            value={optionOne}
            onChange={this.handleChangeOptionOne}
            maxLength={280}
          />
          <textarea
            placeholder="Option Two"
            value={optionTwo}
            onChange={this.handleChangeOptionTwo}
            maxLength={280}
          />
          <button
            type='submit'
            disabled={optionOne === '' | optionTwo === ''}>
              Create
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(CreateQuestion)