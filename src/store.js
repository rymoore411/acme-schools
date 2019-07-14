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
          const response = await axios.post(`/api/students`, student);
          dispatch(_createStudent(response.data));
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
      export {setSchools, setStudents, createStudent, destroyStudent};
