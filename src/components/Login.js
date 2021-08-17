import {React, Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component{
    selected = 'value'

    state = {
        redirectToReferrer: false
      }

    updateSelected = (selected)=>{
        this.selected = selected
    }
    loginFunc = ()=>{
        if(this.selected !=='value'){
            this.props.dispatch(setAuthedUser(this.selected))
            this.setState(()=>({
                redirectToReferrer: true
            })) 
        }
        
    }
    render(){

        const { from } = this.props.location.state || { from: { pathname: '/home' } }
        const { redirectToReferrer } = this.state
        if(redirectToReferrer){
            return <Redirect to={from.pathname}/>
        }


        const{users} = this.props
        const userIds = Object.keys(users).sort()
        return(
            <div className='login-page-container'>
            <div className='login-container'>
                <h1>Would You Rather?</h1>
                <div className='login-selector'>
                <select onChange={(e)=>this.updateSelected(e.target.value)} className='user-select'>
                <option className='option-tag' value='value' >Select User</option>
                    {userIds.map((userId)=>(
                       <option key={userId} className='option-tag' value={userId}>{users[userId].name}</option>     
                    ))}
                </select>
                </div>
                <br/>
                <br/>
                <button className='btn' onClick={this.loginFunc}>Log In</button>
            </div>
            </div>
        )
    }
}

function mapStateToProps({users}){

    return {
        users
    }
}
export default connect(mapStateToProps)(Login)
