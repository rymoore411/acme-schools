import React from 'react';
import axios from 'axios';


class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
    }
    this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  onChange(ev){
    this.setState({[ev.target.name]: ev.target.value});
  }

  async handleClick(ev){
    ev.preventDefault();
    try{
    await axios.post('/api/sessions', this.state);
    const cookie = await axios.get('/api/sessions');
    console.log(cookie);
    window.location.hash = '/';
    }
    catch(ex){
      console.log(ex);
    }

  }

  render(){
    const {onChange, handleClick} = this;
    const {email, password} = this.state;

    return(
      <form>
        <label htmlFor='email'>Email
          <input name='email' value={email} onChange = {onChange}/>
        </label>
        <label htmlFor='password'>Password
          <input name='password' type='password' value={password} onChange = {onChange}/>
        </label>
        <button onClick = {handleClick}>Login</button>
      </form>
    )


  }
}


export default Login;
