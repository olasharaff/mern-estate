import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from "../firebase";

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePercents, setFilePercents] = useState(0)
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  console.warn(fileUploadError)
  console.warn(formData)
  console.log(filePercents);


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
  
  return (
    <div className="max-w-lg mx-auto px-6">
      <h1 className="text-center my-5 font-extrabold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4 items-center justify-center">
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
        <p>{fileUploadError ? (<span className="text-red-700">Error Image Upload </span>) : filePercents > 0 && filePercents < 100 ?( <span className="text-slate-700">{`Uploading ${filePercents}%`}</span>) : filePercents === 100 ? (<span className="text-green-700">Successfully Upload</span>) : "" } </p>
        
        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="username"
          placeholder="username"
        />
        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="email"
          placeholder="email"
        />
        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="password"
          placeholder="password"
        />

        <button
          type="submit"
          className="bg-[#2B2A4C] text-white p-3 rounded-md hover:shadow-md hover:opacity-90 disabled:opacity-30 w-full"
          disabled
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-2 whitespace-nowrap text-[#b31212d6] font-bold">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
