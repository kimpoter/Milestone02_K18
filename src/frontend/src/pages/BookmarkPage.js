import { useContext } from "react";
import AuthContext from "../AuthContext";
import BookmarkDisplay from "../components/BookmarkDisplay";

export default function BookmarkPage() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <div className="flex flex-col items-center text-lg text-primary mt-24">
      <div className="bg-[#EFEFEF] w-full p-8 pb-20 rounded-3xl mt-8">
        <div className="flow-root">
          <div className="float-left ml-32 mt-10">
            <h1>Bookmark</h1>
          </div>
        </div>
        <div className="flex flex-wrap justify-center w-full">
          <BookmarkDisplay />
        </div>
      </div>
    </div>
  );
}
