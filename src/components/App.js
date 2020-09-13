import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'
import {handleInitialData} from '../actions/shared'
import LoginPage from './LoginPage'
import NavBar from './NavBar'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render(){
    const {authenticated, loading} = this.props

    return(
      <Fragment>
        <LoadingBar />
        <div className='container'>
          {loading
            ? null
            : authenticated
              ? <div>
                  <NavBar />
                </div>
              : <LoginPage />
          }
        </div>
      </Fragment>
    )
  }
}

function mapStateToProps({authedUser}){
  return {
    loading: authedUser === null,
    authenticated: authedUser !== '' & authedUser !== null
  }
}

export default connect(mapStateToProps)(App)
