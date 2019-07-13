import React from 'react';
import {connect} from 'react-redux';

const _Schools = ({ schools })=> {
  return(
    <ul>
      {
        schools.map(school => <li key={school.id}>{school.name}</li>)
      }
    </ul>
  )
}

const Schools = (( state )=>{
  return {
    schools: state.schools
  }
})


export default connect(Schools)(_Schools);
