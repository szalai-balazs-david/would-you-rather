import React, {Component} from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class NavBar extends Component{
  onLogout = (e) => {
    this.props.dispatch(setAuthedUser(''))
  }

  render(){
    const {user, authenticated} = this.props
    return (
      <nav className='nav'>
        {authenticated 
        ? <div>
            <img 
              src={user.avatarURL}
              style={{width:30,height:30}}
              alt={user.name}
            />
            <span>Hello {user.name}</span>
          </div>
        : <p>Not logged in</p>}
        <ul className='navbar-ul'>
          <li className='navbar-li'>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li className='navbar-li'>
            <NavLink to='/add' exact activeClassName='active'>
              Create New Question
            </NavLink>
          </li>
          <li className='navbar-li'>
            <NavLink to='/leaderboard' exact activeClassName='active'>
              Leader Board
            </NavLink>
          </li>
          <li onClick={this.onLogout} className='right-aligned'>
            <button className='logout'>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    )
  }
} 

function mapStateToProps({users, authedUser}){
  const user = users[authedUser]
  return {
    user,
    authenticated: authedUser !== '' & authedUser !== null
  }
}

export default connect(mapStateToProps)(NavBar)