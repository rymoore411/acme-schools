import React from 'react';
import { render, HashRouter, Route } from 'react-dom';
import {Provider, connect} from 'react-redux';
import Schools from './Schools';
import Students from './Students';
import Home from './Home';
import Nav from './Nav';
//const {Provider, connect} = ReactRedux;
//const {HashRouter, Route, Link} = ReactRouterDOM;

class _Routes extends React.Component {
  componentDidMount(){
    this.props.loadSchools();
    this.props.loadStudents();
  }
  render(){
    return (
      <HashRouter>
        <Route component = { Nav } />
        <Route path = '/' exact component = { Home } />
        <Route path = '/schools' component = { Schools } />
        <Route path = '/students' component = { Students } />
      </HashRouter>
    );
  }
}

const Routes = connect(null, (dispatch)=> {
  return {
    loadSchools: ()=> dispatch(setSchools()),
    loadStudents: ()=> dispatch(setStudents())
  };
})(_Routes);

const App = ()=> {
  return(
    <Provider store = { store }>
      <Routes />
    </Provider>
  );
};

const root = document.querySelector('#root');
render(<App />, root);
