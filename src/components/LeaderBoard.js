import {React, Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'

class LeaderBoard extends Component {

    render(){
        const {users} = this.props
        const userIds = Object.keys(users).sort((a,b)=>((users[b].questions.length+Object.keys(users[b].answers).length)-
                                                        (users[a].questions.length+Object.keys(users[a].answers).length)))
        
        let position = 1
        let trophy='gold'
        return (
            <div className='leaderboard'>
                <h2>Leader Board</h2>
                <ul className='leaderboard-list'>
                {userIds.map((userId)=>{
                    if(position===1){trophy='gold.png';}
                    else if(position===2){trophy='silver.png'}
                    else {trophy='bronze.png'}
                    position++
                return(  <li key ={userId} className='leaderboard-list-item'>
                        <img className='avatar-leaderboard' src={users[userId].avatarURL} alt='avatar-img'/>
                        {position<=4 &&(<img className='trophy-leaderboard' src={trophy} alt='trophy-img'/>)}
                        <p className='name-header-leaderboard'>{users[userId].name}</p>
                        <p>Answered Questions: {Object.keys(users[userId].answers).length}</p>
                        <p>Created Questions: {users[userId].questions.length}</p>
                        <p className='score'>Score: {Object.keys(users[userId].answers).length + users[userId].questions.length}</p>
                    </li>)

                })}
                </ul>
                
            </div>
        )
    }

}
function mapStateToProps({users}){
    return {
        users
    }
}

export default  connect(mapStateToProps)(LeaderBoard)



