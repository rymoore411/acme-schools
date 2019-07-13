
import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

const _Nav = ({ schools, students})=> {
  return(
    <div>
      <Link to='/'>Home</Link>
      <Link to='/schools'>Schools ({schools.length})</Link>
      <Link to='/students'>Students ({students.length})</Link>
    </div>
  );
}

const Nav = (( state )=> {
  return {
    schools: state.schools,
    students: state.students
  };
});


export default connect(Nav)(_Nav);
