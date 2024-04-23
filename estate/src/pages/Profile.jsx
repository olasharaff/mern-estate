import { useSelector } from "react-redux";

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user)
  console.warn(currentUser);
  return (
    <div className="max-w-lg mx-auto px-6">
      <h1 className="text-center my-5 font-extrabold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4 items-center justify-center">
        <img
          src={currentUser.avatar}
          alt="profile-image"
          className="rounded-full w-36 h-36 object-cover "
        />
        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="email"
          placeholder={currentUser.username}
        />
        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="email"
          placeholder={currentUser.email}
        />
        <input
          type="text"
          className="w-full mb-3 border p-3 rounded-md focus:outline-none put hover:shadow-md"
          id="email"
          placeholder={currentUser.password}
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
