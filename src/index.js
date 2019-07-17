import React, {Component} from 'react';
import {HashRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import Schools from './Schools';
import Students from './Students';
import Home from './Home';
import Nav from './Nav';
import MostPopular from './MostPopular';
import TopSchool from './TopSchool';
import store from './store';
import {setSchools, setStudents} from './store';
//const {Provider, connect} = ReactRedux;
//const {HashRouter, Route, Link} = ReactRouterDOM;

class _Routes extends Component {
  componentDidMount(){
    this.props.loadSchools();
    this.props.loadStudents();
  }
  render(){
    return (
      <HashRouter>
        <Route component = { Nav } />
        <Route path = '/' exact component = { Home } />
        <Route path = '/schools' exact component = { Schools } />
        <Route path = '/students' component = { Students } />
        <Route path = '/schools/:id' component = {MostPopular} />
        <Route path = '/schools/:id' component = {TopSchool} />
      </HashRouter>
    );
  }
}

const Routes = connect(null, (dispatch)=> {
  return {
    loadSchools: ()=> dispatch(setSchools()),
    loadStudents: ()=> dispatch(setStudents())
  };
})(_Routes)

const App = ()=> {
  return(
    <Provider store = { store }>
      <Routes />
    </Provider>
  );
};

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);

// export default connect(Routes)(_Routes);
