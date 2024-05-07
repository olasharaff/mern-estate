import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";
import {useNavigate} from 'react-dom'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const {currentUser, error, isLoading} = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePercents, setFilePercents] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
 


  useEffect(() => {
    // if the file is exist then create a function for it
    if (file) {
      handleFileUpload(file)
    }
  },[file]);
  
    // the function for uploading of the file
    const handleFileUpload = (file) => {
      // create a name for the file so it make it unique for later upload
      const fileName = new Date().getTime() + file.name
      // create a storage for the file
      const storage = getStorage(app)
      // create a storage reference for the file
      const storageRef = ref(storage, fileName)
      // then upload the file
      const uploadTask = uploadBytesResumable(storageRef, file)
      // then track the upload progress and changes 
      uploadTask.on('state_changed',
      (snapshot)=>{
        // record the progress of the upload
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100
       setFilePercents(Math.round(progress))
      }, error =>{
       setFileUploadError(true)
      },
      ()=> {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
          setFormData({...formData, avatar:downloadURL})
        })
      }
    )
    }
    const handleChange =(e) =>{
      setFormData({...formData, [e.target.id]: e.target.value})

    }
    const handleSubmit = async (e) =>{
      e.preventDefault();
      try {
        dispatch(updateUserStart())
        const res = await fetch(`/api/user/update/${currentUser._id}`,{
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData),
        })
        const data = await res.json()
        if(data.success === false){
          dispatch(updateUserFailure(data.message));
          return
        }
        dispatch(updateUserSuccess(data))
        setUpdateSuccess(true)
      } catch (error) {
        dispatch(updateUserFailure(error.message))
      }
       
    }
    const handleDelete = async () =>{
      try {
        dispatch(deleteUserStart())
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: "DELETE",
        });
        const data = await res.json()
        if(data.success === false){
          dispatch(deleteUserFailure(data.message))
          return
        }
        dispatch(deleteUserSuccess(data))
        navigate('/sign-in')
      } catch (error) {
        dispatch(deleteUserFailure(error.message))
      }
    }
  
  return (
    <div className="max-w-lg mx-auto px-6">
      <h1 className="text-center my-5 font-extrabold text-3xl">Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center justify-center"
      >
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          alt="profile-image"
          className="rounded-full w-36 h-36 object-cover "
          onClick={() => fileRef.current.click()}
        />
        <p>
          {fileUploadError ? (
            <span className="text-red-700">Error Image Upload </span>
          ) : filePercents > 0 && filePercents < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePercents}%`}</span>
          ) : filePercents === 100 ? (
            <span className="text-green-700">Successfully Upload</span>
          ) : (
            ""
          )}{" "}
        </p>

        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="username"
          defaultValue={currentUser.username}
          placeholder="username"
          onChange={handleChange}
        />
        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="email"
          defaultValue={currentUser.email}
          placeholder="email"
          onChange={handleChange}
        />
        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="password"
          placeholder="password"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#2B2A4C] text-white p-3 rounded-md hover:shadow-md hover:opacity-90 disabled:opacity-30 w-full"
        >
          {isLoading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-2 whitespace-nowrap text-[#b31212d6] font-bold">
        <span className="cursor-pointer" onClick={handleDelete}>Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
    </div>
  );
}
