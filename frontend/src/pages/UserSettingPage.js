import { FaUserCircle } from "react-icons/fa";
import { useContext } from "react";
import AuthContext from "../AuthContext";

export default function UserSettingPage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="mt-12">
      <h1>Pengaturan Pengguna</h1>
      <div className="card mt-8 flex flex-row w-full space-x-12">
        <div className="text-8xl">
          <FaUserCircle />
        </div>
        <form className="flex flex-col space-y-4 w-[30vw]">
          <label>Username</label>
          <input
            disabled
            className="form-input"
            placeholder={currentUser.username}
          ></input>

          <label>Email</label>
          <input
            disabled
            placeholder={currentUser.email}
            className="form-input"
          ></input>
        </form>
        <ul className="space-y-4">
          <li>
            <label>Review</label>
            <p>{currentUser.reviews.length}</p>
          </li>
          <li>
            <label>Bookmark</label>
            <p>{currentUser.bookmarks.length}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
