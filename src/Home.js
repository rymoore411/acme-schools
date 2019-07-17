import React from 'react';
import {connect} from 'react-redux';
import {popular, top} from './store';

const Home = ({schools, studentsPopular, topSchool}) => {

  if(topSchool === undefined || studentsPopular.length === 0){
    return null;
  }

  const popularSchoolId = studentsPopular.find((student)=>(student)).schoolId;
  const popularSchool = schools.find((school)=>(school.id === popularSchoolId));

  return(
    <div>
      <h2>Home</h2>
      <p>Our most popular school is {popularSchool.name} with {studentsPopular.length}</p>
      <p>Our top performing school is {topSchool.topSchool.name} with an average GPA of {topSchool.avgGPA}</p>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    schools: state.schools,
    studentsPopular: popular(state),
    topSchool: top(state)
  }
}

export default connect(mapStateToProps)(Home);
