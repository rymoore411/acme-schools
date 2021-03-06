import React, {Component} from 'react';
import {HashRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import Schools from './Schools';
import Students from './Students';
import Home from './Home';
import Nav from './Nav';
import MostPopular from './MostPopular';
import TopSchool from './TopSchool';
import Login from './Login';
import {setSession, setSchools, setStudents} from './store';

class _App extends Component {
  componentDidMount(){
    this.props.loadSchools();
    this.props.loadStudents();
    this.props.loadSession();
  }
  render(){
    const {user} = this.props;
    if(user.email){
      window.location.hash = '/';
    return (
      <HashRouter>
        <Route component = { Nav } />
        <Route path = '/' exact component = { Home } />
        <Route path = '/schools' exact component = { Schools } />
        <Route path = '/students' component = { Students } />
        <Route path = '/schools/popular' component = {MostPopular} />
        <Route path = '/schools/top' component = {TopSchool} />
        <Route path = '/login' component = {Login} />
      </HashRouter>
    );
    }
    else{
      window.location.hash = '/login';
      return(
        <HashRouter>
          <Route path = '/login' component = {Login} />
        </HashRouter>
      )
    }
  }
}

const mapStateToProps = ({user})=>{
  return {
    user,
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    loadSchools: ()=> dispatch(setSchools()),
    loadStudents: ()=> dispatch(setStudents()),
    loadSession: ()=> dispatch(setSession())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_App);
