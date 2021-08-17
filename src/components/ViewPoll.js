import {React, Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import LoadingBar from 'react-redux-loading'


class ViewPoll extends Component{

    render(){
        const { questions,qid,users,authedUser} = this.props
        const question = questions[qid]
        const{optionOne,optionTwo,author} = question
        const optionOneVotes = optionOne.votes.length;
        const optionTwoVotes = optionTwo.votes.length;
        const totalVotes = optionOneVotes+optionTwoVotes
        const optionOneVotePercentage = (optionOneVotes/totalVotes)*100
        const optionTwoVotePercentage = (optionTwoVotes/totalVotes)*100

        const optionOnePoll ={
            width: optionOneVotePercentage+'%'
        }
        const optionTwoPoll ={
            width: optionTwoVotePercentage+'%'
        }
        const optionOneVoteBadge ={
            display:'none'
        }
        const optionTwoVoteBadge ={
            display:'none'
        }
        let voted = optionOne.votes.find((id)=>(id===authedUser))
       if(voted===undefined) voted = optionTwo.votes.find((id)=>(id===authedUser))
       if(voted){
        if(users[authedUser].answers[qid]==='optionOne') optionOneVoteBadge.display = 'block'
        else optionTwoVoteBadge.display = 'block'
       } 
        return(
            <div>                
            <LoadingBar />
            {voted &&(<div className='view-poll'>
                <p className='asked-by-header'><span>Asked by {users[author].name}</span></p>
                <img className='avatar-home poll-avatar' src={`../${users[author].avatarURL}`} alt='img'/>
                <div className='option-card'>
                <p className='option-question'>Would you rather {optionOne.text}?</p>
                <div className='option-bar'>
                    <div className='polling' style={optionOnePoll}></div>
                    <p className='percentage'>{Math.round(optionOneVotePercentage*10)/10}%</p>
                </div>
                <p className='votes'>{optionOneVotes} out of {totalVotes} vote(s)</p>
                <p className='your-vote-badge' style={optionOneVoteBadge}>Your Vote</p>
                </div>
                <div className='option-card'>
                <p className='option-question'>Would you rather {optionTwo.text}?</p>
                <div className='option-bar'>
                <div className='polling' style={optionTwoPoll}></div>
                <p className='percentage'>{Math.round(optionTwoVotePercentage*10)/10}%</p>
                </div>
                <p className='votes'>{optionTwoVotes} out of {totalVotes} vote(s)</p>
                <p className='your-vote-badge' style={optionTwoVoteBadge}>Your Vote</p>
                </div>                
            </div>)}
            
        </div>
        )
    }
}

function mapStateToProps({questions,users,authedUser},props){
    const { qid } = props
    return {
        questions,
        qid,
        users,
        authedUser
    }
}
export default connect(mapStateToProps)(ViewPoll)
