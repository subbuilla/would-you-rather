import {React, Component,Fragment } from 'react';
import '../App.css';
import {handleGetUsers} from '../actions/shared'
import {handleGetQuestions} from '../actions/shared'
import {connect} from 'react-redux'
import { BrowserRouter as Router, Redirect, Route,Switch } from 'react-router-dom'
import Nav from './Nav'
import Login from './Login';
import NewQuestion from './NewQuestion';
import LeaderBoard from './LeaderBoard';
import Home from './Home';
import Question from './Question';
import PrivateRoute from './PrivateRoute'
import NoMatch from './NoMatch';
import Logout from './Logout';
import LoadingBar from 'react-redux-loading'



class App extends Component{
  componentDidMount(){
        const {dispatch} = this.props
        dispatch(handleGetUsers())
        dispatch(handleGetQuestions())
  }
  
render(){
  const {authedUser} = this.props

  return(
    <Router>
        <div className="App-header">
        <LoadingBar />
        
          <Fragment>
                 {authedUser &&(<Nav/ >)}
                 <LoadingBar />
                 <Switch>
                 <Route path='/' exact component={Login} />
                 <PrivateRoute path='/home' component={Home} />
                 <PrivateRoute path='/add' component={NewQuestion} />
                 <PrivateRoute path ='/leaderboard' component={LeaderBoard} />
                 <PrivateRoute path ='/questions/:qid' component={Question} />
                 {/* <Route path ='/viewPoll/:qid' component={AnsweredQuestion} /> */}
                 <PrivateRoute path='/logout'  component={Logout} />
                 <Route path='/404' component={NoMatch}/>
                 {authedUser &&<Route render={()=>(<Redirect to ='/404' />)}/>}
                 {authedUser===null &&
                    <Route render={(props)=>(
                      <Redirect to={{
                          pathname: '/',
                          state: { from: props.location }
                        }} 
                      />)}
                    />
                  }
                 </Switch>
          </Fragment>
        </div>
    </Router>
  )
}
}


function mapStateToProps({users,authedUser,questions}){

  return {
    users,
    authedUser,
    questions
  }

}

export default connect(mapStateToProps)(App);
