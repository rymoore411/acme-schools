
import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {createStudent, popular, top} from './store'

const Nav = ({ schools, students, handleCreate, location, studentsPopular, topSchools})=> {

  const {pathname} = location;

  if(studentsPopular.length === 0 || topSchools === undefined){
    return null;
  }

  const popularSchoolId = studentsPopular.find((student)=>(student)).schoolId;

  const popularSchool = schools.find((school)=>(school.id === popularSchoolId));

  return(
    <div>
    <div>
      <Link to='/' className ={pathname === '/' ? 'active': ''}>Home</Link>
      <Link to='/schools' className ={pathname === '/schools' ? 'active': ''}>Schools ({schools.length})</Link>
      <Link to='/students' className ={pathname === '/students' ? 'active': ''}>Students ({students.length})</Link>
      <Link to={`/schools/${popularSchoolId}`} className ={pathname === `/schools/${popularSchoolId}`? 'active': ''}>Most Popular {popularSchool.name} ({studentsPopular.length})</Link>
      <Link to={`/schools/${topSchools.topSchool.id}`} className={pathname === `/schools/${topSchools.topSchool.id}`? 'active': ''}>Top School ({topSchools.topSchool.name})</Link>
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
    students: state.students,
    studentsPopular: popular(state),
    topSchools: top(state)
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
