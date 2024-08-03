import { useContext, useRef } from 'react';
import './login.css'; 
import { AuthContext } from '../../context/AuthContext';
import {loginCall} from "../../apiCalls"
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';


const Login = () => {  
  const email = useRef()
  const password = useRef()
  const { user, isFetching, error, dispatch} = useContext(AuthContext)
  const navigate = useNavigate();

const handleClick = () => {
  navigate('/register');
}  

const handleSubmit = (e)=>{
    e.preventDefault()
    loginCall({email: email.current.value , password: password.current.value},dispatch)
  }
  // console.log(user)

  return (
    <div className="login-container">
      <div className="logo-container">
        <h2 className="logo-text">ZephyreVerse</h2>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input 
        type="email"
        ref={email} 
        placeholder="Email address" 
        className="input-field" 
        required />
        <input 
        type="password" 
        ref={password}
        placeholder="Password" 
        className="input-field"
        // minLength="5"
        required />
        <button type="submit" className="login-button" disabled={isFetching}>
            {isFetching ?<CircularProgress color="inherit" size="15px"/>:"Log In"}
        </button>
        {error && <span className="error-message">Login failed. Please try again.</span>}
        <p className="forgot-password">Forgot password?</p>
      </form>
      <div className="create-account">
        <button className="create-account-button" onClick={handleClick} disabled={isFetching}>
        {isFetching ?<CircularProgress color="inherit" size="15px"/>:"Create New Account"}</button>
      </div>
    </div>
  );
};

export default Login;
