import React, {Component} from 'react'
import {connect} from 'react-redux'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class LoginPage extends Component {
  onUserSelected = (e) => {
    console.log(e)
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