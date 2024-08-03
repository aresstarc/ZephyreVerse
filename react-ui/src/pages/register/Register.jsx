import { useRef, useState } from 'react';
import './register.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const Register = () => {
  
  const [isSignup, setIsSignup] = useState(false)
  const username = useRef()
  const email = useRef()
  const password = useRef()
  const retypePassword = useRef()


  const navigate = useNavigate()

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if(isSignup) return

    setIsSignup(true)
    if(retypePassword.current.value !== password.current.value){
      retypePassword.current.setCustomValidity("Passwords don't match")
    } else{
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      try{
        await axios.post("http://localhost:3000/api/auth/register", user)
        navigate("/login")
      } catch(err){
        console.log(err)
      } finally{
        setIsSignup(false)
      }
    }
  }

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <h2 className="logo-text">ZephyreVerse</h2>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" ref={username} className="input-field" required/>
        <input type="email" placeholder="Email address" ref={email} className="input-field" required/>
        <input type="password" placeholder="Password" ref={password} className="input-field" required/>
        <input type="password" placeholder="Retype password" ref={retypePassword} className="input-field" required/>
        <button type="submit" className="login-button" disabled={isSignup}>
          {isSignup ?<CircularProgress color="inherit" size="15px"/>: "Create New Account"}
        </button>
      </form>
      <div className="create-account">
        <button className="create-account-button" onClick={handleClick} disabled={isSignup}>
          {isSignup ?<CircularProgress color="inherit" size="15px"/>: "Log into your Account"}
          </button>
      </div>
    </div>
  );
};

export default Register;