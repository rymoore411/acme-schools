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

const Schools = connect(( state )=>{
  return {
    schools: state.schools
  }
})(_Schools);
