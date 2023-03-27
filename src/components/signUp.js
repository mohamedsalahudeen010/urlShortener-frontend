import React, { useState } from "react"
import { useHistory } from "react-router-dom"



const SignUpPage=()=>{
    const history=useHistory();

    const[name,setName]=useState();
    const[email,setEmail]=useState();
    const[password,setPassword]=useState();
    const[password1,setPassword1]=useState();
    const[password2,setPassword2]=useState();
    const[show,setShow]=useState(false);
    

    const passwordCheck=()=>{
        if(password1===password2){
            setPassword(password1)
        }
    }

   
   const handleSubmit=async (e)=>{
    e.preventDefault()
try {
    const user={
        name,
        email,
        password
    }
    const response=await fetch("https://url-shortener-back-end-gamma.vercel.app/signup",{
        method:"POST",
        body:JSON.stringify(user),
        headers:{
            "Content-Type":"application/json"
        }
    })
    const data=await response.json()
    console.log(data)
    if(data.message==="Signup completed successfully"){
        history.push("/")
    }
    else if(data.message==="Email Already Exist"){
        setShow(true)
    }
} catch (error) {
    console.log(error)
}


   }


return(
    <div className="container">
  
    <div >
      <img className="guvi-logo" src="https://d2lk14jtvqry1q.cloudfront.net/media/small_GUVI_1_c02a18fad7.png" alt='Guvi-Logo'/>
    </div>
    <div>
                <h1>Guvi Url Shortener</h1>
     </div>
  
    <div className="Sign_up">
            <p>...or enter your information below.</p>
    <form onSubmit={(e)=>{handleSubmit(e)}}>
    <div>
                    <label htmlFor="name" className="label">Name</label>
                    <input className="input" 
                    type="text" 
                    id="name"
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    ></input>
                </div>
                <div>
                    <label htmlFor="email" className="label">Email address</label>
                    <input className="input" 
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                        onClick={()=>{
                         setShow(false)}}></input>
                </div>
                <div>
                    <label htmlFor="password1" className="label">Password</label>
                    <input className="input"
                     type="password" 
                     id="password1"
                     value={password1}
                     onChange={(e)=>{setPassword1(e.target.value)}}></input>
                </div>
                <div>
                    <label htmlFor="password2" className="label">Confirm Password</label>
                    <input className="input" 
                    type="password" 
                    id="password2"
                    value={password2}
                     onChange={(e)=>{setPassword2(e.target.value)}}></input>
                </div>
                {show?<h3>Email already exist please Enter new email to signup </h3>:""}
                <div className="remember">
                <input type="checkbox" name="" id=" remember"></input>
                   <label htmlFor="remember" className="remember_label" >I accept the terms & conditions</label>
                   <button type="submit" className="login-btn" onClick={passwordCheck}>Register</button>
                </div>
    </form>

    </div>
    <p>This site is protected by reCAPTCHA and the Google 
    <span><a href='https://policies.google.com/privacy' target={"_blank"}  rel={"noreferrer"}>Privacy Policy 
    </a></span>and <span><a href='https://policies.google.com/terms' target={"_blank"}  rel={"noreferrer"}>Terms of Condition </a></span> apply.</p>
    <hr></hr>
    <div className='footer_Newuser'>
      <p>Already have an account? <button onClick={()=>{history.push("/")}}>Sign in ! </button> </p>
    </div>
    </div>
)

}


export default SignUpPage
