import {React, Component } from 'react';
import '../App.css';
import {connect} from 'react-redux'
import {setAuthedUser} from '../actions/authedUser'
import { Redirect } from 'react-router-dom'


class Logout extends Component {
    
    componentDidMount(){
    const {dispatch} = this.props
    dispatch(setAuthedUser(null))

    }
    render(){
        return(
            <Redirect to='/'/>
        )
    }
        
    

}



export default connect()(Logout)