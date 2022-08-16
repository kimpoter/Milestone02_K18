import { FaUserCircle } from "react-icons/fa";
import { useContext, useRef, useState } from "react";
import AuthContext from "../AuthContext";

export default function UserSettingPage() {
  const { currentUser } = useContext(AuthContext);
  const newUsername = useRef();
  const newEmail = useRef();
  const newPassword = useRef();
  const [loading, setLoading] = useState(false);
  function editUser(e) {
    e.preventDefault();

    setLoading(true);
    fetch(`http://localhost:8000/user/${currentUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: !newUsername.current.value
          ? currentUser.username
          : newUsername.current.value,
        email: !newEmail.current.value
          ? currentUser.email
          : newEmail.current.value,
        password: !newPassword.current.value
          ? currentUser.password
          : newPassword.current.value,
        role: currentUser.role,
        isVerified: currentUser.isVerified,
        createdAt: currentUser.createdAt,
        updatedAt: currentUser.updatedAt,
      }),
    }).then(() => {
      setLoading(false);
      window.alert("Data berhasil diubah.");
      window.location.reload(false);
    });
  }

  return (
    <div className="mt-12">
      <h1>Pengaturan Pengguna</h1>
      <div className="card mt-8 flex flex-row w-full space-x-12">
        <div className="text-8xl">
          <FaUserCircle />
        </div>
        <form
          disabled={loading}
          onSubmit={editUser}
          className="flex flex-col space-y-4 w-[30vw]"
        >
          <label>Username</label>
          <input
            className="form-input"
            placeholder={currentUser.username}
            ref={newUsername}
          ></input>

          <label>Email</label>
          <input
            type="email"
            placeholder={currentUser.email}
            className="form-input"
            ref={newEmail}
          ></input>

          <label>Password</label>
          <input
            type="password"
            placeholder="new password"
            className="form-input"
            ref={newPassword}
          ></input>

          <button type="submit" className="btn-primary w-fit">
            Ubah data
          </button>
        </form>
        <ul className="space-y-4">
          <li>
            <label>Review</label>
            <p>12</p>
          </li>
          <li>
            <label>Bookmark</label>
            <p>22</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
