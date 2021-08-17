import {React, Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'


class Poll extends Component{
    
    
    render(){
        const {questions,users,qid} = this.props
     
        // if(homeView==='Unanswered'){
            return (
                
                    <div>
                        <p className='asks-header'> {users[questions[qid].author].name} asks </p>
                        <h3> Would you rather</h3>
                        <img className='avatar-home' src={users[questions[qid].author].avatarURL} alt='img'/>
                        ...{questions[qid].optionOne.text}...<br/>
                        <Link to={`/questions/${qid}`} className=''>
                        <button className='btn poll-btn'>View Poll</button>
                        </Link>
                    </div>
                
                    )
        // }
        //     return(
        //             <div>
        //                <p className='asks-header'> {users[questions[qid].author].name} ask's </p>
        //                 <h3> Would you rather</h3>
        //                 <img className='avatar-home' src={users[questions[qid].author].avatarURL} alt='img'/>
        //                 ...{questions[qid].optionOne.text}...<br/>
        //                 <Link to={`/viewPoll/${qid}`} className=''>
        //                 <button className='btn poll-btn'>View Poll</button>
        //                 </Link>
        //             </div>
        //             )
    }
} 


function mapStateToProps({questions,users},{qid}){

    return {
        users,
        questions,
        qid
    }
}
export default connect(mapStateToProps)(Poll)