import React, {Component} from 'react'
import {connect} from 'react-redux'
import LeaderBoardEntry from './LeaderBoardEntry'
import {pointRankingSelector} from '../utils/helpers'

class Leaderboard extends Component {
  render(){
    const {users} = this.props

    return (
      <div>
        {users.map(x => <LeaderBoardEntry key={x} id={x} />)}
      </div>
    )
  }
}

function mapStateToProps({users}){
  return {
    users: pointRankingSelector(users)
  }
}

export default connect(mapStateToProps)(Leaderboard)