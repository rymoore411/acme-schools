import React from 'react';
import {connect} from 'react-redux';
import {setLogin} from './store';


const Login = ({user, handleLogin})=>{

  return(
    <form onSubmit = {handleLogin}>
      <label>Email
        <input type="text" name="email" required/>
      </label>
      <label>Password
        <input type="password" name="password" required/>
      </label>
      <div ><font color="red">{(user === 'MAKE AN ACCOUNT' || user === 'WRONG PASSWORD') ? user : ''}</font></div>
      <button>Login</button>
    </form>
  )

}


const mapStateToProps = (state)=>{
  return{
    user: state.user
  }
}

const mapDispatchToProps = ( dispatch )=>{
  return{
    handleLogin: function(ev){
      event.preventDefault();

      dispatch(setLogin({
        email: ev.target.email.value,
        password: ev.target.password.value
      }))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
