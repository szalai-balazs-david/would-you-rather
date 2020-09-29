import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import {handleInitialData} from '../actions/shared'
import LoginPage from './LoginPage'
import NavBar from './NavBar'
import HomePage from './HomePage'
import CreateQuestion from './CreateQuestion'
import Leaderboard from './Leaderboard'
import QuestionDetails from './QuestionDetails'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }

  render(){
    const {authenticated, loading} = this.props

    return(
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            {loading
              ? null
              : !authenticated
                ? <LoginPage />
                : <div>
                    <NavBar />
                    <div>
                      <Route path='/' exact component={HomePage} />
                      <Route path='/add' exact component={CreateQuestion} />
                      <Route path='/leaderboard' exact component={Leaderboard} />
                      <Route path='/questions/:id' exact component={QuestionDetails} />
                    </div>
                  </div>
            }
          </div>
        </Fragment>
      </Router>
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
