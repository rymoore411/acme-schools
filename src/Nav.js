
import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import {createStudent, popular, top} from './store'

const Nav = ({ schools, students, handleCreate, location, studentsPopular, topSchool})=> {

  const {pathname} = location;

  if(studentsPopular.length === 0 || topSchool === undefined){
    return null;
  }

  const popularSchoolId = studentsPopular.find((student)=>(student)).schoolId;

  const popularSchool = schools.find((school)=>(school.id === popularSchoolId));

  return(
    <div>
    <div>
      <Link to='/' className ={pathname === '/' ? 'active': ''}>Acme Schools</Link>
      <Link to='/schools' className ={pathname === '/schools' ? 'active': ''}>Schools ({schools.length})</Link>
      <Link to='/students' className ={pathname === '/students' ? 'active': ''}>Students ({students.length})</Link>
      <Link to={`/schools/popular`} className ={pathname === `/schools/popular`? 'active': ''}>Most Popular {popularSchool.name} ({studentsPopular.length})</Link>
      <Link to={`/schools/top`} className={pathname === `/schools/top`? 'active': ''}>Top School ({topSchool.topSchool.name})</Link>
    </div>

    <div>
      <form onSubmit ={handleCreate}>
        <div>
          <label>First Name</label>
          <input type="text" name="firstName" required/>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text" name="lastName" required/>
        </div>
        <div>
          <label>Email</label>
          <input type="text" name="email" required/>
        </div>
        <div>
          <label>GPA</label>
          <input type="text" name="gpa" required/>
        </div>
        <div>
          <label>Enroll at</label>
          <select name="schools">
            <option value={null}>-- Not Enrolled --</option>
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
    topSchool: top(state)
  };
});

const mapDispatchToProps = ( dispatch )=> {
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
}


export default connect(mapStateToProps, mapDispatchToProps)(Nav);
