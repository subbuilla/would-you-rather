import React, {Component} from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {setAuthedUser} from '../actions/authedUser'
import '../App.css';


class  Nav extends Component {

  logOutFunc = ()=>{
    const {dispatch} = this.props
    dispatch(setAuthedUser(null))
  }
  render(){
    const {authedUser,users} = this.props
    return (
      <nav className='nav'>
        <ul className='nav-container'>
          <li>
          <img className='avatar nav-avatar' src={users[authedUser].avatarURL} alt='img'/> &nbsp; &nbsp;
          </li>
          <li className='welcome-message'>
          Hello, {users[authedUser].name} &nbsp; &nbsp;
          </li>
          <li>
            <NavLink to='/home' exact activeClassName='active' className='nav-link'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/add' activeClassName='active' className='nav-link'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active' className='nav-link'>
              Leader Board
            </NavLink>
          </li>
          <li className='logout-item'>
          <NavLink to='/logout' activeClassName='active'>
          <button className='logout-button'>Log Out</button>
          </NavLink>
          </li>
        </ul>
      </nav>
    )
  }
  
} 

function mapStateToProps({authedUser,users}){

  return {
    authedUser,
    users
  }

}
export default connect(mapStateToProps)(Nav)