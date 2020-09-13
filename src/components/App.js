import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'
import {handleInitialData} from '../actions/shared'
import LoginPage from './LoginPage'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render(){
    const {authenticated} = this.props

    return(
      <Fragment>
        <LoadingBar />
        <div className='container'>
          {this.props.loading === true
            ? null
            : this.props.authenticated
              ? <div>
                  App
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
