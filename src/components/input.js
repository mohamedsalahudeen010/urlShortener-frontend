import React from "react"
import {  useHistory } from 'react-router-dom';



const InputText=(props)=>{

    const history=useHistory();
    return(
        <div>
            <form>
                <div>
                    <label for="email" className="label">Enter your Email</label>
                    <input className="input" type="email" id="email"></input>
                </div>
                <div>
                    <label for="password" className="label">Enter your Password</label>
                    <input className="input" type="password" id="password"></input>
                </div>
                <div>
                    <button className="forget-password" onClick={()=>history.push("/forgetPassword")}>Forget Password</button>
                </div>
                <div className="remember">
                <input type="checkbox" name="" id=""></input>
                   <label for="remember" className="remember_label">Remember password</label>
                   <button type="submit" className="login-btn">Login</button>
                </div>
            </form>
        </div>
        
    )
}

export default InputText