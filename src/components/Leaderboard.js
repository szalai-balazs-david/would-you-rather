import React, {Component} from 'react'
import {connect} from 'react-redux'
import LeaderBoardEntry from './LeaderBoardEntry'

class Leaderboard extends Component {
  render(){
    const {users} = this.props

    return (
      <div>
        {users.map(x => <LeaderBoardEntry key={x} id={x} position={users.indexOf(x)+1} />)}
      </div>
    )
  }
}

function mapStateToProps({users}){
  const userValues = Object.values(users)
  const points = userValues.map(x => {
    return {
      id: x.id,
      points: x.questions.length + Object.values(x.answers).length
    }
  })
  const sorted = points.sort((a, b) => (a.points < b.points) ? 1 : -1)
  
  return {
    users: sorted.map(x => x.id)
  }
}

export default connect(mapStateToProps)(Leaderboard)