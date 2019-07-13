import {connect} from 'react-redux';
import React from 'react';

const _Students = ({ students })=> {

  return(
    <ul>
      {
        students.map(student => <li key={student.id}>{student.firstName}</li>)
      }
    </ul>
  )
}

const Students = (( state )=>{
  return {
    students: state.students
  }
})

export default connect(Students)(_Students);
