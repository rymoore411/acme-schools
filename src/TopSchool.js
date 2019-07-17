import {connect} from 'react-redux';
import React from 'react';
import {top} from './store'

const TopSchool = ({topSchool}) => {

  if(topSchool === undefined){
    return null;
  }

  return(
    <div>
      <h2>{topSchool.topSchool.name}({topSchool.students.length} Students enrolled)</h2>
      <ul>
        {
          topSchool.students.map(student=> <li key={student.id}>{student.firstName}</li>)
        }
      </ul>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    topSchool: top(state)
  }
}

export default connect(mapStateToProps)(TopSchool);
