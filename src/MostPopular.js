import {connect} from 'react-redux';
import React from 'react';
import {popular} from './store'


const MostPopular = ({studentsPopular, schools}) => {

  if(studentsPopular.length === 0){
    return null;
  }

  const popularSchoolId = studentsPopular.find((student)=>(student)).schoolId;

  const popularSchool = schools.find((school)=>(school.id === popularSchoolId));

  return(
    <div>
      <h2>{popularSchool.name}({studentsPopular.length}) Enrolled</h2>
        <ul>
          {
            studentsPopular.map(student=> <li key={student.id}>{student.firstName}</li>)
          }
        </ul>
    </div>
  )
}

const mapStateToProps = ((state) => {

  return {
    schools: state.schools,
    studentsPopular: popular(state)
  }

});



export default connect(mapStateToProps)(MostPopular);
