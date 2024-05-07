
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase.js'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'



export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleAuth = async () =>{
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const results = await signInWithPopup(auth, provider)
            console.warn(results);
            // Send the user data to the backend
            const res = await fetch("api/auth/google", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: results.user.displayName,
                email: results.user.email,
                photo: results.user.photoURL,
              }),
            });
            const data = await res.json()
            dispatch(signInSuccess(data))
            navigate('/')

        } catch (error) {
            console.warn("Could not connect to Google", error)
        }
    }
  return (
    <button
      type="button"
      className="bg-[#b31212d6] w-full text-center mt-2 p-3 rounded-md hover:shadow-lg text-white" onClick={handleGoogleAuth}
    >
      Continue with Google
    </button>
  );
}
