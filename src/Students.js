import {connect} from 'react-redux';
import React from 'react';
import {destroyStudent} from './store';

const Students = ({ students, handleDestroy, schools })=> {

  return(
    <ul>
      {
        students.map(student => <li key={student.id}>{student.firstName}{' '}
        {student.lastName}{' '}GPA:
        <select name="schools">
          {
            schools.map(school=>(<option key={school.id} value={school.id}>{school.name}</option>))
          }
        </select>
         {student.GPA}<button onClick = {()=>handleDestroy(student.id)} className = 'button'>Destroy</button></li>)
      }
    </ul>
  )
}

const mapStateToProps = (( state )=>{
  return {
    students: state.students,
    schools: state.schools
  }
})

const mapDispatchToProps = (( dispatch )=>{
  return{
    handleDestroy: function(id){
      dispatch(destroyStudent({id}))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Students);
