import React, {Component} from 'react'
import {connect} from 'react-redux'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { setAuthedUser } from '../actions/authedUser'

class LoginPage extends Component {
  onUserSelected = (e) => {
    console.log(e)
    this.props.dispatch(setAuthedUser(e.value))
  }

  render(){
    const options = this.props.users.map((user) => {
      return {
        value: user.id, 
        label: user.name
      }
    })

    return (
      <div>
        <Dropdown 
          options={options} 
          placeholder="Who are you?" 
          onChange={this.onUserSelected} 
        />
      </div>
    )
  }
}

function mapStateToProps({users}){
  return {
    users: Object.values(users)
  }
}

export default connect(mapStateToProps)(LoginPage)