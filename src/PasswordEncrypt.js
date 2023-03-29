import React, { useRef } from 'react'
import bcrypt from "bcryptjs";

const PasswordEncrypt = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //Sign up Function
  const SignUpForm = (e) => {
    e.preventDefault()
    console.log("SignIn")

    const email=emailInputRef.current.value;
    const password=passwordInputRef.current.value;

    //Hash value password
    const hashedPassword=bcrypt.hashSync(password,10);
    console.log(hashedPassword)
    //You can call post api here
    window.localStorage.setItem("login",JSON.stringify({email,hashedPassword}))
  }

  //Login Function
  const LoginForm = (e) => {

    console.log("Login")
    e.preventDefault()
    const email=emailInputRef.current.value;
    const password=passwordInputRef.current.value;
    //you can call get api
    const getHashedPassword=JSON.parse(window.localStorage.getItem("login")). hashedPassword
    console.log(getHashedPassword);
    //Match Password
    bcrypt.compare(password,getHashedPassword,function(err,isMatch){
        if(err){
            throw err;
        }
        else if(!isMatch){
            console.log("Password does not match !")
        }else{
            console.log("Password matched !")
        }
    })
  }
  return (
    <form>
      {/* For email Input */}
      <input type="email" placeholder='email' ref={emailInputRef} style={{ padding: "15px", borderRadius: "10px", margin: "10px" }} />
      {/* For Password input */}
      <input type="password" placeholder='password' ref={passwordInputRef} style={{ padding: "15px", borderRadius: "10px", margin: "10px" }} />
      {/* Sign up button */}
      <button type='submit' onClick={(e) => SignUpForm(e)} style={{ padding: "15px", borderRadius: "10px", margin: "10px" }}>
        Sign up
      </button>
      {/* Login button */}
      <button type='submit' onClick={(e) => LoginForm(e)} style={{ padding: "15px", borderRadius: "10px", margin: "10px" }}>
        Login
      </button>

    </form>

  )
}

export default PasswordEncrypt