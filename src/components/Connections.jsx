
import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionsSlice'

const Connections = () => {
    const connections=useSelector((store)=>store.connection)
    const dispatch=useDispatch();
    const getConnections=async ()=>{
      try{
        const res=await axios.get(BASE_URL+"/user/connections",{withCredentials:true})
        
dispatch(addConnections(res?.data?.value))
      }
      catch(err){
        console.log(err.message)
      }
    }
    useEffect(()=>{
        getConnections();
    },[])
    if (!connections) return ; 
    if (connections.length === 0) return <h1>No connections found.</h1>;

  return (
    <div className='text-center my-10'>
    <div className='text-bold text-white text-3xl'>Connections</div>
    {connections.map((connection, index) =>{ 
        const {firstName,lastName,age,gender,photoUrl,about}=connection
               return(
                <div key={index} className='flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto'>
<div>
<img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} style={{ maxWidth: 'none' }} />

</div>
<div className='text-left mx-4'>
    <h2 className='font-bold text-x'>{firstName +" "+lastName}</h2>
    {age && gender && <p>{age+","+gender}</p>}
    <p >{about}</p>
</div>
                </div>
               )
})}
    </div>
  )
}

export default Connections