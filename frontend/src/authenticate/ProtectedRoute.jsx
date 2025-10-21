import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useMyContext } from '../context/MyContext'

const ProtectedRoute = () => {
  const [isVerified, setIsVerified] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {setIsLogin, setUser, url} = useMyContext();
  const navigate = useNavigate();

  useEffect(() =>{
    const verifyToken = async () =>{
        try {
            // setIsLoading(true);
            const response = await axios.get(`${url}/auth/verify`, { withCredentials: true })
            if(response.status === 200)
              {
                // console.log(response.data.userDetails)
                setUser(response.data.userDetails);
                setIsLogin(true)
                setIsVerified(true);
              } 
              else{
                setIsVerified(false);
                setIsLogin(false);
                setUser(null);
              }
              // console.log(response.status);
              
            } catch (error) {
              setIsVerified(false);
              setIsLogin(false);
              setUser(null);
            console.log("Error in Verifying, Error: ", error);
        }
        finally{
          setIsLoading(false);
        }
    }
    verifyToken();
  }, [])

  if(isLoading || isVerified === null)
  {
    return <div>Loading...</div>
  }
    
  return (
    isVerified ? <Outlet /> : <Navigate to="/" />
  )
}

export default ProtectedRoute
