      import {createStore, combineReducers, applyMiddleware} from 'redux';
      import thunk from 'redux-thunk';
      import axios from 'axios';

      const SET_SCHOOLS = 'SET_SCHOOLS';
      const SET_STUDENTS = 'SET_STUDENTS';
      const CREATE_STUDENT = 'CREATE_STUDENT';
      const DESTROY_STUDENT = 'DESTROY_STUDENT';

      const SET_SESSION = 'SET_SESSION';
      const SET_LOGIN = 'SET_LOGIN';
      const SET_LOGOUT = 'SET_LOGOUT';

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

      const authReducer = (state = {}, action)=>{
        switch(action.type){
          case SET_SESSION:
            return action.session;
          case SET_LOGIN:
            return action.user;
          case SET_LOGOUT:
            state = {};
            return state;
        }
        return state;
      }

      const reducer = combineReducers({
        schools: schoolsReducer,
        students: studentsReducer,
        user: authReducer
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

      const schoolCount = (state)=>{

        let schoolObj = {};
        let schoolArr = [];

        const students = state.students;
        const schools = state.schools;

        if(students.length !== 0 && schools.length !== 0){

        students.forEach(stud =>{

          let num = stud.schoolId;

          if(!schoolObj[num]){
            schoolObj[num] = 1;
          }
          else{
            schoolObj[num]++;
          }

        })

        schools.forEach(school => {

          for(let key in schoolObj){

            if(school.id === key){

              schoolArr.push({
                schoolName: school.name,
                studentCount: schoolObj[key],
                id: school.id
                })
            }
          }
        })

        schools.forEach(el=>{

        if(schoolArr.find((school)=>(school.schoolName === el.name)) === undefined){

          schoolArr.push({
            schoolName: el.name,
            studentCount: 0,
            id: el.id
           })
          }
        })

        return schoolArr;
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
        return async (dispatch)=> {
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

      //Login and Logout

      const _setSession = (session)=>{
        return {
          type: SET_SESSION,
          session
        }
      }

      const setSession = ()=>{
        return async (dispatch)=>{
          const response = await axios.get('/api/sessions');
          dispatch(_setSession(response.data));
        }
      }

      const _setLogin = (user)=>{
        return {
          type: SET_LOGIN,
          user
        }
      }

      const setLogin = (user)=>{
        return async (dispatch)=>{
          try{
          const response = await axios.post('/api/sessions', user);
          dispatch(_setLogin(response.data));
          window.location.hash = '/';
          }
          catch(ex){
            console.log(ex.response.data);
            dispatch(_setLogin(ex.response.data));
          }
        }
      }

      const _setLogout = ()=>{
        return{
          type: SET_LOGOUT,
        }
      }

      const setLogout = ()=> {
        return async (dispatch)=>{
          await axios.delete('/api/sessions');
          dispatch(_setLogout());
        }

      }


      export default store;
      export {setSession, setLogin, setLogout, setSchools, setStudents, createStudent, destroyStudent, popular, top, schoolCount};
