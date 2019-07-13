
import {connect} from 'react-redux';
import { Link } from 'react-dom';

const _Nav = ({ schools, students})=> {
  return(
    <div>
      <Link to='/'>Home</Link>
      <Link to='/schools'>Schools ({schools.length})</Link>
      <Link to='/students'>Students ({students.length})</Link>
    </div>
  );
}

const Nav = connect(( state )=> {
  return {
    schools: state.schools,
    students: state.students
  };
})(_Nav);
