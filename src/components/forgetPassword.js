import React from "react"
import {  useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from "react";



const ForgetPage=()=>{
   
    const history=useHistory();
    const [email,setEmail]=useState("");
   

    const addEmail= async (event)=>{
      event.preventDefault()
            try {
              console.log(email)
              const enteredEmail={
               email
              
              }
              console.log(enteredEmail)

              const response=await fetch("https://url-shortener-back-end-gamma.vercel.app/api/forgetPassword",{
                method:"POST",
                body:JSON.stringify(enteredEmail),
                headers:{
                  "Content-Type":"application/json"
                }
              });
              const data=await response.json();
              console.log(data)
              history.push("/")
            } catch (error) {
              console.log("error",error)
            }
    
           
          }
   return(
   <div className="container">   
    <div >
      <img className="https://play-lh.googleusercontent.com/OlbGuCl8s81YRMV5_t0Agx_C6t2b3EFt3Ra8aX1Yb6MTwcnGU-1ZzDChSTc5ca9k_h0" alt='Guvi-Logo'/>
    </div>
    <h1>Guvi Url Shortener</h1>
   
    <div>
    <div>
            <form>
                <div>
                    <label for="email" className="label">Enter your Email</label>
                    <input className="input" type="email"
                     id="email" 
                     onChange={(e)=>setEmail(e.target.value)}
                     value={email}></input>
                </div>
                <div className="remember">
                <input type="checkbox" name="" id=""></input>
                   <label htmlFor="remember" className="remember_label">Remember password</label>
                   <button type="" className="login-btn" onClick={(e)=>{addEmail(e)}}>Enter</button>
                </div>
            </form>
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


export default ForgetPage
