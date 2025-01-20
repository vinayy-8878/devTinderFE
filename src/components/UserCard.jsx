import React from 'react';
import axios from 'axios';

import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
const UserCard = ({ user }) => {
  const {_id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch=useDispatch();
  const handleSendRequest=async (status,userid)=>{
   try{
    const res=await axios.post(BASE_URL+"/request/send/"+status+"/"+userid,{},{withCredentials:true});
    dispatch(removeUserFromFeed(userid))
   }
   catch(err){
    console.log(err.message)
   }
  }
  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img
          src={photoUrl}
          alt="Profile photo"
          style={{ width: '90%', height: 'auto', maxHeight: '350px', objectFit: 'cover' }} 
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>

        {age && gender && <p>{age + "," + gender}</p>}
        <div className="max-w-md">
  <p className="line-clamp-4 break-words">{about}</p>
</div>
        <div className="card-actions justify-center my-4">
          <button className="btn btn-primary"  onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
          <button className="btn btn-secondary"  onClick={() => handleSendRequest("interested",_id)}>Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
