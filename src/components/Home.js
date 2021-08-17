import {React, Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import Poll from './Poll';
import LoadingBar from 'react-redux-loading'


class Home extends Component{
    state = {
        homeView : 'Unanswered'
    }
    updateView = ()=>{
        this.setState((previousState)=>({
            homeView : previousState.homeView==='Unanswered' ? 'Answered' : 'Unanswered'
        }))
    }
    render(){
        const {users,questions,authedUser} = this.props
        const questionIds = Object.keys(questions).sort((a,b)=>(questions[b].timestamp - questions[a].timestamp))
        const answeredQuestionIds = Object.keys(users[authedUser].answers).sort((a,b)=>(questions[b].timestamp - questions[a].timestamp))
        const unansweredQuestionIds = questionIds.filter((id)=>(
            !answeredQuestionIds.find((aId)=>(aId===id))
        ))
        const btnText = this.state.homeView==='Unanswered' ? 'Answered' : 'Unanswered'

        return(
            
            <div className='home-container'>
                <LoadingBar />
                <div className='home-header'>
                <h2>{this.state.homeView} Questions</h2>
                <button className='btn home-view-btn' onClick={this.updateView}>View {btnText} Questions</button>
                </div>
                
                <ul className='home-list-container'>
                {(this.state.homeView==='Unanswered') ? 
                unansweredQuestionIds.map((id)=>(
                 <li key={id} className='home-list-item'>
                    <Poll key={id} qid={id} />
                 </li>   
                ))
                :
                answeredQuestionIds.map((id)=>(
                <li key={id} className='home-list-item'>
                <Poll key={id} qid={id} />
                </li>
                ))
                }
                </ul>
            </div>
            
        )
    }
}
function mapStateToProps({users,questions,authedUser}){
    return {
        users,
        questions,
        authedUser
    }
}

export default connect(mapStateToProps)(Home)
