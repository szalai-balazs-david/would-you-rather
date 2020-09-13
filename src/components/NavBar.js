import React, {Component} from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class NavBar extends Component{
  onLogout = (e) => {
    this.props.dispatch(setAuthedUser(''))
  }

  render(){
    return (
      <nav className='nav'>
        <ul>
          <li>
            <button onClick={this.onLogout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    )
  }
} 
export default connect()(NavBar)