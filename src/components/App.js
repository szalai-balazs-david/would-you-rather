import React, {Component} from 'react'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import LoginPage from './LoginPage'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render(){
    const {authenticated} = this.props

    if(!authenticated){
      return <LoginPage />
    }

    return (
      <div>
        App
      </div>
    )
  }
}

function mapStateToProps({authedUser}){
  return {
    authenticated: authedUser !== null
  }
}

export default connect(mapStateToProps)(App)
