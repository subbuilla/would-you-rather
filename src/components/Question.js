import {React, Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {handleAddAnswer} from '../actions/questions'
import ViewPoll from './ViewPoll';
// import NoMatch from './NoMatch';
import {Redirect} from 'react-router-dom'


class Question extends Component{
    state ={
        selectedOption : '',
        submitted : false
    } 

    componentDidMount(){
        const {qid,users,authedUser} = this.props
        const found = Object.keys(users[authedUser].answers).find((id)=>(id===qid))
        if(found){
            this.setState(()=>({
                submitted :true
            }))
        }

    }

    updateSelected = (e) =>{   
            this.setState(()=>({
                selectedOption: e.target.value
            }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {selectedOption} = this.state
        if(selectedOption===''){console.log('Option Not Selected')}
        else{
            const {authedUser,qid} =this.props
           this.props.dispatch(handleAddAnswer({
               qid,
               authedUser,
               answer:selectedOption
           }))
           this.setState(()=>({
            submitted : true 
           }))

        }

    }
    render(){
        const {questions,qid,users} = this.props
        
        if(this.state.submitted){
            return <ViewPoll qid={qid} /> 
        }
           if(questions[qid]){
           return (<div>
                    <div className='question-card'>
                    <p className='asks-header'> {users[questions[qid].author].name} asks </p>
                        <h2>Would you rather</h2>
                        <img className='avatar-question' src={`../${users[questions[qid].author].avatarURL}`} alt='img'/>
                        <form onSubmit={this.handleSubmit}>
                        <label htmlFor="optOne">
                        <input id="optOne" name="option" type='radio' value='optionOne' onChange={this.updateSelected} className='input-radio'/>
                        {questions[qid].optionOne.text}<br/>
                        </label>
                        <label htmlFor="optTwo">
                        <input id="optTwo" name="option" type='radio' value='optionTwo'onChange={this.updateSelected} className='input-radio'/>
                        {questions[qid].optionTwo.text}<br/>
                        </label>
                        <button className='btn poll-btn' type='submit'>View Poll</button>
                        </form>
                    </div>
                    </div>) 
           }
           return <Redirect to='/404' />
    }
} 


function mapStateToProps({questions,authedUser,users},props){
    const { qid } = props.match.params
    return {
        questions,
        qid,
        authedUser,
        users
    }
}
export default connect(mapStateToProps)(Question)