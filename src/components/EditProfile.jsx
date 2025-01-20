import React,{useState} from 'react'
import UserCard from './UserCard'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'

const EditProfile = ({user}) => {
  
const dispatch=useDispatch()
  const [firstName,setFirstName]=useState(user.firstName)

  const [lastName,setLastName]=useState(user.lastName)

  const [photoUrl,setPhotoUrl]=useState(user.photoUrl)

  const [age,setAge]=useState(user.age || "")

  const [about,setAbout]=useState(user.about || "")

  const [gender,setGender]=useState(user.gender || "")

  const [error,setError]=useState("");
  const [showToast,setShowToast]=useState(false);
  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
   
      console.log("Data before dispatch:", res?.data?.data);
dispatch(addUser(res?.data?.data));

      

  
      
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error("Error:", err.response); 
      setError(err.response?.data?.details[0] || "An error occurred");
    }
  };
  
  const handleAge=(e)=>{
    const inputValue = e.target.value;
    if (/^\d*$/.test(inputValue)) {
      setAge(inputValue); // Allow only numbers
    }
  }
  return (
  <>
    <div className='flex justify-center my-10'>
      <div className="flex justify-center mx-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Edit Profile</h2>
          <div className="my-2">
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text">First Name:</span>
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e)=>{setFirstName(e.target.value)}}
               
                className="input input-bordered input-success w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text">Last Name:</span>
              </div>
              <input
                type="text"
              
                value={lastName}
                onChange={(e)=>{setLastName(e.target.value)}}
                className="input input-bordered input-success w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text">Photo URL:</span>
              </div>
              <input
                type="text"
                
                value={photoUrl}
                onChange={(e)=>{setPhotoUrl(e.target.value)}}
                className="input input-bordered input-success w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="text"
                value={age}
                onChange={handleAge}
                className="input input-bordered input-success w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input
                type="text"
               
                value={gender}
                onChange={(e)=>{setGender(e.target.value)}}
                className="input input-bordered input-success w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs mb-2">
              <div className="label">
                <span className="label-text">About</span>
              </div>
              <input
                type="text"
                value={about}
                onChange={(e)=>{setAbout(e.target.value)}}
                className="input input-bordered input-success w-full max-w-xs"
              />
            </label>
          </div>
      <p className="text-red-400 ">{error}</p>
          <div className="card-actions justify-center my-1">
            <button className="btn btn-primary w-full" onClick={saveProfile}>Save Profile</button>
          </div>
        </div>
      </div>
    </div>
    <UserCard user={{firstName,lastName,age,gender,about,photoUrl}}/>
    </div>
  {showToast &&  <div className="toast toast-top toast-center">
  <div className="alert alert-success">
    <span>Profile updated successfully.</span>
  </div>
 
</div>}
    </>
  )
}

export default EditProfile