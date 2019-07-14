
import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

const _Nav = ({ schools, students})=> {
  return(
    <div>
    <div>
      <Link to='/'>Home</Link>
      <Link to='/schools'>Schools ({schools.length})</Link>
      <Link to='/students'>Students ({students.length})</Link>
    </div>
    <div>
      <form>
        <div>
          <label>First Name</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>GPA</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Enroll at</label>
          <select name="schools">
            {
              schools.map((school)=>(
                <option key={school.id}>{school.name}</option>
              ))
            }
          </select>
        </div>
        <button>Save</button>
      </form>
    </div>
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
