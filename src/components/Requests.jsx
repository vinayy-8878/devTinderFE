import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { allRequests, removeRequest } from "../utils/requestsSlice";

const Requests = () => {

  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const getRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });
      dispatch(allRequests(res?.data?.value));
    } catch (err) {
      console.log(err.message);
    }
  };
  const reviewRequests=async (status,_id)=>{
  try{
    const res=await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})
dispatch(removeRequest(_id));
  }catch(err){
    console.log(err.message)
  }
  }
  useEffect(() => {
    getRequests();
  }, []);
  if (!requests) return;
  if (requests.length === 0) return <h1 className="flex justify-center my-10">No requests found.</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className=" flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-error mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-success mx-2"
               onClick={()=>reviewRequests("accepted",request._id)}
              >
                Accept
              </button>
            </div>
          </div>
  );
})}
 </div>
  );
};

export default Requests;
