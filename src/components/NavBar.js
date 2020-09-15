import React, {Component} from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class NavBar extends Component{
  onLogout = (e) => {
    this.props.dispatch(setAuthedUser(''))
  }

  render(){
    console.log(this.props)
    return (
      <nav className='nav'>
        <p>Hello {this.props.user}</p>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/create' exact activeClassName='active'>
              Create New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' exact activeClassName='active'>
              Leader Board
            </NavLink>
          </li>
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

function mapStateToProps({authedUser}){
  return {
    user: authedUser
  }
}

export default connect(mapStateToProps)(NavBar)