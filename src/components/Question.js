import React, {Component} from 'react'

class Question extends Component {
  render(){
    return (
      <div>
        Question {this.props.id}
      </div>
    )
  }
}

export default Question