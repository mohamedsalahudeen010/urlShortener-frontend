import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


const UrlShortenerPage=()=>{

    const [long_url,setLong_url]=useState();
    const [givenShort_url,setGivenShort_url]=useState();
    const [short_url,setShort_url]=useState();
    const [data,setData]=useState()
    const [urlEntered,setUrlEntered]=useState(false)
    const [urlExist,setUrlExist]=useState(false)
    useEffect(()=>{
       const urlData=async()=>{
        try {
            
            const response=await fetch("https://url-shortener-back-end-gamma.vercel.app/url",{
                method:"GET",
                headers:{
                    "x-auth-token":localStorage.getItem("token")
                }
            })
            const data=await response.json()
            setData(data)
        } catch (error) {
            console.log(error)
        }
       }
       
       urlData()
    },[data])
   
    const handleDelete=async(id)=>{
        try {
            console.log("delete called")
            const response=await fetch(`https://url-shortener-back-end-gamma.vercel.app/url/${id}`,{
                method:"DELETE",
                headers:{
                    "x-auth-token":localStorage.getItem("token")  
                }
            })
            const data1=await response.json();
            console.log(data1)
            const removeUrl=data.filter((url,idx)=>(
                url._id!==id
            ))
            setData(removeUrl)

        } catch (error) {
            console.log(error)
        }
    }

    const handleLogout=()=>{
        localStorage.removeItem("name");
        localStorage.removeItem("token");
        history.push("/")
    }

    const shortenUrl=(url)=>{
        let otpForUrl="";

        let variables="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

        let length=variables.length;
        for(let i=0;i<5;i++){
            
            otpForUrl+=variables.charAt(Math.floor(Math.random()*length))

        }
        
            
            setShort_url(`https://${url}/${otpForUrl}`)
            
    }

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const data={
            longUrl:long_url,
            shortUrl:short_url
        }
    try {
        const response=await fetch("https://url-shortener-back-end-gamma.vercel.app/url",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json",
                "x-auth-token":localStorage.getItem("token")
                
            }
        })

        const url=await response.json()
        if(url.message==="content sent successfully"){
            setUrlEntered(true)
             setLong_url("")
           
            setData([...data,url.message.url])
            
           
        }
        else if(url.message==="Url entered is already exist"){
            setUrlExist(true)
            setLong_url("")
        }
        console.log(url)
    } catch (error) {
        
    }
    }
    const history=useHistory()
    return(
        <div className="container">
            <div>
                <button className="btn-logout"
                onClick={handleLogout}>Log Out</button>
          </div>
              <div>
                <h1>Guvi Url Shortener</h1>
              
            </div>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <label htmlFor="long_url" className="label">Enter your long URL</label>
                <input className="input"
                 type="text" 
                 id="long_url"
                 onChange={(e)=>{setLong_url(e.target.value)}}
                 value={long_url}
                   onClick={()=>{
                     setUrlEntered(false);
                       setUrlExist(false)
                   }}></input>
            </div>
                        <div>
                <label htmlFor="long_url" className="label">Enter your Short URL</label>
                <input className="input"
                 type="text" 
                 id="long_url"
                 onChange={(e)=>{setGivenShort_url(e.target.value)}}
                 value={givenShort_url}
                   onClick={()=>{
                     setUrlEntered(false);
                       setUrlExist(false)
                   }}></input>
            </div>
            <div>
                   <button type="submit" 
                   className="short-btn"
                       onClick={()=>shortenUrl(givenShort_url)}>Short your URL </button>
            </div >
        </form>
        {urlEntered?
        <h5 style={{marginTop:"1rem",color:"green"}}>Url Shortened Successfully</h5>:""}
        {urlExist?<h5 style={{marginTop:"1rem",color:"red"}}>Url Entered is Already exist</h5>:""}
      
        <div className="row m-5">
            {data&& data.map((data,idx)=>(
               <div className="col-md-3" style={{ width: '30%'}} key={data._id}>
                  <Card style={{ width: '100%' ,minHeight:"15rem",margin:"1rem 3.5rem" }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <div className="row">
          <p style={{marginLeft:"auto",fontSize:"0.8rem"}}>Long URL : {data.longUrl}</p>
        </div>
        <div className="row">
        <p style={{marginLeft:"auto"}}>
            <a href={data.shortUrl} target="BLANK"
            >{data.shortUrl}</a>
            </p>
        </div>
      <Button variant="danger"
        onClick={()=>{handleDelete(data._id)}}>Delete</Button>
      </Card.Body>
    </Card>
               </div> 
            ))

            }
        </div>
    </div>
    )
}


export default UrlShortenerPage
