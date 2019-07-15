
import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {createStudent} from './store'

const Nav = ({ schools, students, handleCreate, location})=> {
  const {pathname} = location;

  return(
    <div>
    <div>
      <Link to='/' className ={pathname === '/' ? 'active': ''}>Home</Link>
      <Link to='/schools' className ={pathname === '/schools' ? 'active': ''}>Schools ({schools.length})</Link>
      <Link to='/students' className ={pathname === '/students' ? 'active': ''}>Students ({students.length})</Link>
    </div>
    <div>
      <form onSubmit ={handleCreate}>
        <div>
          <label>First Name</label>
          <input type="text" name="firstName" />
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastName" />
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" />
        </div>
        <div>
          <label>GPA</label>
          <input type="text" name="gpa" />
        </div>
        <div>
          <label>Enroll at</label>
          <select name="schools">
            {
              schools.map((school)=>(
                <option key={school.id} value={school.id}>{school.name}</option>
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

const mapStateToProps = (( state )=> {
  return {
    schools: state.schools,
    students: state.students
  };
});

const mapDispatchToProps = (( dispatch )=> {
  return {
    handleCreate: function(evt){
      event.preventDefault();
      dispatch(createStudent({
        firstName: evt.target.firstName.value,
        lastName: evt.target.lastName.value,
        email: evt.target.email.value,
        GPA: evt.target.gpa.value,
        schoolId: evt.target.schools.value
      }));
    }
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Nav);
