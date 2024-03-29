import React, { useState } from "react"
import {  useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';




const MainPage=()=>{
   
    const history=useHistory();

    const[email,setEmail]=useState();
    const[password,setPassword]=useState();

    const handleSubmit=async(e)=>{
      e.preventDefault()
      const credentials={
        email,
        password
      }
      try {
        
        const response= await fetch("https://url-shortener-back-end-gamma.vercel.app/login",{
          method:"POST",
          body:JSON.stringify(credentials),
          headers:{
            "Content-Type":"application/json",
            
          }
        })

        const data=await response.json();
        console.log(data)
       if(data.message==="logged in successfully"){
        localStorage.setItem("name",data.name);
        localStorage.setItem("token",data.token);
        history.push("/urlShortener")
       }
      } catch (error) {
        console.log(error)
      }
    }
    

   return(
   <div className="container">   
    <div >
      <img className="guvi-logo" src="https://play-lh.googleusercontent.com/OlbGuCl8s81YRMV5_t0Agx_C6t2b3EFt3Ra8aX1Yb6MTwcnGU-1ZzDChSTc5ca9k_h0" alt='Guvi-Logo'/>
    </div>
    <div>
                <h1>Guvi Url Shortener</h1>
            </div>
   
    <div>
    <form onSubmit={(e)=>{handleSubmit(e)}}>
                <div>
                    <label htmlFor="email" className="label">Enter your Email</label>
                    <input className="input" 
                    type="email"
                    id="email"
                    onChange={(e)=>{setEmail(e.target.value)}}
                    value={email}></input>
                </div>
                <div>
                    <label htmlFor="password" className="label">Enter your Password</label>
                    <input className="input" 
                    type="password" 
                    id="password"
                    onChange={(e)=>{setPassword(e.target.value)}}
                    value={password}></input>
                </div>
                
                <div className="remember">
                <input type="checkbox" name="" id=""></input>
                   <label for="remember" className="remember_label">Remember password</label>
                   <button type="submit" className="login-btn">Login</button>
                </div>
            </form>
<div>
                    <button className="forget-password" onClick={()=>history.push("/forgetPassword")}>Forget Password</button>
                </div>
       
  <p>This site is protected by reCAPTCHA and the Google 
    <span><a href='https://policies.google.com/privacy' target={"_blank"}  rel={"noreferrer"}>Privacy Policy 
    </a></span>and <span><a href='https://policies.google.com/terms' target={"_blank"}  rel={"noreferrer"}>Terms of Condition </a></span> apply.</p>
    <hr></hr>
    <div className='footer_Newuser'>
      <p>New user? <button onClick={()=>{history.push("/signup")}}>Create an account ! </button> </p>
    </div>
    </div>
    </div>
    )
}


export default MainPage
