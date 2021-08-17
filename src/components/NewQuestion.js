import {React, Component } from 'react';
import '../App.css';
import {handleAddQuestion} from '../actions/questions'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'


class NewQuestion extends Component{

    state = {
        optionOneText:'',
        optionTwoText:'',
        submitted:false
    }

    handleChangeOptionOne = (e)=>{
        const optionOneText = e.target.value
        this.setState(()=>({
            optionOneText
        }))
    }
    handleChangeOptionTwo = (e)=>{
        const optionTwoText = e.target.value
        this.setState(()=>({
            optionTwoText
        }))
    }
    handleSubmit = (e)=>{
        e.preventDefault();
            this.props.dispatch(handleAddQuestion({
                author: this.props.authedUser,
                optionOneText: this.state.optionOneText,
                optionTwoText: this.state.optionTwoText
            }))

            this.setState(()=>({
                submitted : true 
               }))
       
        
    }
    render(){
        const {optionOneText, optionTwoText,submitted} = this.state
        
        if(submitted){
           return <Redirect to='/home' />
        }
        return (
            <div>
                <div className='new-question-card'>
                <h2>Create New Question</h2>
                <p>complete the question</p>
                <form onSubmit={this.handleSubmit}>
                <h3>Would you rather...</h3>

                <input type='text' placeholder='Enter Option One Text Here' className='option-input' value ={optionOneText} onChange={this.handleChangeOptionOne}/><br/>
                <br/>
                <input type='text' placeholder='Enter Option Two Text Here' className='option-input' value ={optionTwoText} onChange={this.handleChangeOptionTwo}/>
                <br/>
                <button type='submit' className='btn submit-btn'
                disabled={optionOneText.trim()==='' || optionTwoText.trim()===''}>Submit</button>
                </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps({authedUser}){
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(NewQuestion)