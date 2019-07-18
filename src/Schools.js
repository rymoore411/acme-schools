import React from 'react';
import {connect} from 'react-redux';
import {schoolCount} from './store';

const Schools = ({ schools, students, count })=> {

  if(count === undefined){
    return null;
  }

  return(
    <ul>
      {
        schools.map(school => <li key={school.id}>{school.name}</li>)
      }
    </ul>
  )
}

const mapStateToProps = ( state )=>{
  return {
    schools: state.schools,
    students: state.students,
    count: schoolCount(state)
  }
}


export default connect(mapStateToProps)(Schools);
