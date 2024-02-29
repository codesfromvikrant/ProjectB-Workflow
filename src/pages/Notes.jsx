import React, { useEffect } from "react";
import Header from "../components/notes/Header";
import Collection from "../components/notes/Collection";
import { useDispatch } from "react-redux";
import { setAllNotes, setFilteredNotes } from "../features/notesSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
// import Pagination from "../components/Pagination";

const Notes = () => {
  const dispatch = useDispatch();
  const uid = JSON.parse(sessionStorage.getItem("user_data")).uid;
  const get_data = async () => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return undefined;
      return docSnap.data();
    } catch (error) {
      console.error(error.code, error.message);
      return undefined;
    }
  };

  useEffect(() => {
    document.title = "Notes & Docs | WorkFlow";
    (async () => {
      try {
        const user_data = await get_data();
        if (user_data) {
          const { notes_data } = user_data;
          dispatch(setAllNotes(notes_data));
          dispatch(setFilteredNotes(notes_data));
        }
      } catch (error) {
        console.error(error.code, error.message);
      }
    })();
  }, []);

  return (
    <main className="w-full h-[100vh] overflow-y-auto">
      <div className="py-5 sm:px-6 px-4 max-w-6xl mx-auto ">
        <Header />
        <Collection />
        {/* <Pagination /> */}
      </div>
    </main>
  );
};

export default Notes;
