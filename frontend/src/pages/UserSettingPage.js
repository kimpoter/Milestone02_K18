import { FaUserCircle } from "react-icons/fa";

export default function UserSettingPage() {
  return (
    <div className="mt-12">
      <h1>Pengaturan Pengguna</h1>
      <div className="card mt-8 flex flex-row w-full space-x-12">
        <div className="text-8xl">
          <FaUserCircle />
        </div>
        <form
          className="flex flex-col space-y-4 w-[30vw]"
        >
          <label>Username</label>
          <input
            className="form-input"
          ></input>

          <label>Email</label>
          <input
            type="email"
            className="form-input"
          ></input>

          <label>Password</label>
          <input
            type="password"
            className="form-input"
          ></input>

          <button className="btn-primary w-fit">
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