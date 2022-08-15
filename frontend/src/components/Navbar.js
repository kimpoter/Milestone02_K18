import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../AuthContext";

function Navbar(props) {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  function logOut() {
    setCurrentUser({ loggedIn: false });
  }
  return (
    <div className="fixed z-10 w-screen bg-white flex justify-between items-center text-primary pl-12 py-4 shadow-[0_21px_52px_0_rgba(0,0,0,0.1)]">
      <div className="flex items-center space-x-4">
        <img src="logo.svg" className="w-[24px]" alt="ITBFood logo" />
        <Link to="/" className="font-semibold text-2xl">
          ITBFood
        </Link>
      </div>
      <div className="flex items-center relative space-x-4 bg-greyscale rounded-l-[36px] pl-6 pr-12 py-4">
        <ul className="flex rounded-[69px] bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.25)] px-1 py-1">
          <button
            onClick={() => props.setCampus("GANESHA")}
            className={
              "px-6 py-1 rounded-[69px] " +
              (props.campus === "GANESHA" && "bg-secondary text-white")
            }
          >
            Ganesha
          </button>
          <button
            onClick={() => props.setCampus("JATINANGOR")}
            className={
              "px-6 py-1 rounded-[69px] " +
              (props.campus === "JATINANGOR" && "bg-secondary text-white")
            }
          >
            Jatinangor
          </button>
        </ul>
        <button
          onClick={props.handleDropdown}
          className="text-4xl text-white bg-[#A3A3A3] rounded-full"
        >
          <FaUserCircle />
        </button>

        {props.dropdownState && (
          <>
            {currentUser.loggedIn ? (
              <ul className="absolute -bottom-36 right-0 w-[300px] bg-white shadow-[0_10px_22px_0_rgba(0,0,0,0.15)] rounded-b-[20px] pb-4 hover:cursor-pointer flex flex-col">
                <Link
                  to="/user/bookmark"
                  className="hover:bg-greyscale w-full py-2 text-left"
                >
                  <span className="pl-8">Bookmark</span>
                </Link>
                <Link
                  to="/user/setting"
                  className="hover:bg-greyscale w-full py-2 text-left"
                >
                  <span className="pl-8">Pengaturan pengguna</span>
                </Link>
                <button
                  onClick={logOut}
                  className="hover:bg-greyscale w-full py-2 text-left"
                >
                  <span className="pl-8">Keluar</span>
                </button>
              </ul>
            ) : (
              <ul className="absolute -bottom-24 right-0 w-[300px] bg-white shadow-[0_10px_22px_0_rgba(0,0,0,0.15)] rounded-b-[20px] pb-4 hover:cursor-pointer flex flex-col">
                <Link
                  to="/signin"
                  className="hover:bg-greyscale w-full py-2 text-left"
                >
                  <span className="pl-8">Masuk</span>
                </Link>
                <Link
                  to="/signup"
                  className="hover:bg-greyscale w-full py-2 text-left"
                >
                  <span className="pl-8">Buat Akun</span>
                </Link>
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
