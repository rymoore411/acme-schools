import {connect} from 'react-redux';
import React from 'react';
import {destroyStudent} from './store';

const Students = ({ students, handleDestroy })=> {

  return(
    <ul>
      {
        students.map(student => <li key={student.id}>{student.firstName}<button onClick = {()=>handleDestroy(student.id)}>Destroy</button></li>)
      }
    </ul>
  )
}

const mapStateToProps = (( state )=>{
  return {
    students: state.students
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
