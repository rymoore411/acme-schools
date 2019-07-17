      import {createStore, combineReducers, applyMiddleware} from 'redux';
      import thunk from 'redux-thunk';
      import axios from 'axios';

      const SET_SCHOOLS = 'SET_SCHOOLS';
      const SET_STUDENTS = 'SET_STUDENTS';
      const CREATE_STUDENT = 'CREATE_STUDENT';
      const DESTROY_STUDENT = 'DESTROY_STUDENT';

      const schoolsReducer = (state = [], action)=> {
        switch(action.type){
          case SET_SCHOOLS:
            return action.schools;
        }
        return state;
      }

      const studentsReducer = (state = [], action)=> {
        switch(action.type){
          case SET_STUDENTS:
            return action.students;
          case CREATE_STUDENT:
            return [...state, action.student];
          case DESTROY_STUDENT:
            return state.filter(student => action.student.id !== student.id);
        }
        return state;
      }

      const reducer = combineReducers({
        schools: schoolsReducer,
        students: studentsReducer
      });

      const popular = (state) => {

        let matchStudents;

        if(state.students){
        const students = state.students;

        const schools = state.schools;

        const studentIds = students.map(el=>(el.schoolId));

        let countIds = {};

        for(let i = 0; i < studentIds.length; i++){

          let num = studentIds[i];

          if(!countIds[num]){
            countIds[num] = 1;
          }
          else{
            countIds[num]++;
          }
        }

        let max = 0;
        let maxId;

        for(let key in countIds){
          if(countIds[key] > max){
            maxId = key;
            max = countIds[key];
          }
        }

        matchStudents = students.filter((student)=>{

          if(student.schoolId){

          return(
          maxId === (student.schoolId).toString())
          }
        })

        //const matchSchool = schools.find((school)=>(school.id === maxId));
        return matchStudents;

      }
    }

      const top = (state) => {

        const studs = state.students;
        const schools = state.schools;

        let countGPA = {};

        if(studs.length !== 0 ){

        studs.forEach((el)=>{

          let school = el.schoolId;

          if(!countGPA[school]){
            countGPA[school] = el.GPA*1;
          }
          else{
            countGPA[school] = countGPA[school] + (el.GPA*1);
          }
        })

        let max = 0;
        let maxId;

        for(let key in countGPA){
          if(countGPA[key] > max){
            maxId = key;
            max = countGPA[key];
          }
        }

        const maxStudents = studs.filter(stud=>{

          if(stud.schoolId){

          return (
            maxId === ((stud.schoolId).toString())
              )
            }
          }
          );

        const gpa = (max/(maxStudents.length)).toFixed(2);

        const top = schools.find((school)=>(maxId === school.id));

        const topInfo = {
          students: maxStudents,
          avgGPA: gpa,
          topSchool: top
        }
        return topInfo;

      }

      }

      const store = createStore(reducer, applyMiddleware(thunk));

      //Action creators, thunks
      const _destroyStudent = (student)=> {
        return {
          type: DESTROY_STUDENT,
          student
        }
      }

      const destroyStudent = (student)=> {
        return async (dispatch) => {
          await axios.delete(`/api/students/${student.id}`);
          dispatch(_destroyStudent(student));
        }
      }


      const _createStudent = (student)=> {
        return {
          type: CREATE_STUDENT,
          student
        }
      }

      const createStudent = (student)=>{
        return async (dispatch) => {
          try{
          console.log(student.schoolId);
          if(student.schoolId === '-- Not Enrolled --'){
            delete student.schoolId;
          }

          const response = await axios.post(`/api/students`, student);
          dispatch(_createStudent(response.data));
          }
          catch(ex){
            console.log(ex);
          }
        }
      }

      const _setSchools = (schools)=> {
        return {
          type: SET_SCHOOLS,
          schools
        }
      }

      const _setStudents = (students)=> {
        return {
          type: SET_STUDENTS,
          students
        }
      }

      const setSchools = ()=>{
        return async (dispatch) => {
          const response = await axios.get('/api/schools');
          dispatch(_setSchools(response.data));
        }
      }

      const setStudents = ()=>{
        return async (dispatch) => {
          const response = await axios.get('/api/students');
          dispatch(_setStudents(response.data));
        }
      }


      export default store;
      export {setSchools, setStudents, createStudent, destroyStudent, popular, top};
