import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { auth, db } from "../firebase/config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  GithubAuthProvider,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createDoc } from "../utils/firestoreUtils";
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setLoggedIn } from "../features/authSlice";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth.logged_in);
  const navigate = useNavigate();

  const googleprovider = new GoogleAuthProvider();
  const googleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, googleprovider);
      dispatch(setLoggedIn(true));
      authStateChange();
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  const gitprovider = new GithubAuthProvider();
  const gitAuth = async () => {
    try {
      const result = await signInWithPopup(auth, gitprovider);
      authStateChange();
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  const authStateChange = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const data = {
          uid: user.uid,
          email_id: user.email,
          username: user.displayName,
        };
        sessionStorage.setItem("user_data", JSON.stringify(data));
        dispatch(setLoggedIn(true));
        navigate("/userdash");
      } else {
        dispatch(setLoggedIn(false));
        console.log("User is signed out");
      }
    });
  };

  const getCreateData = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      dispatch(
        setAuth({
          uid: user.uid,
          email_id: user.email_id,
          username: user.username,
        })
      );
    } else {
      createDoc(
        {
          uid: user.uid,
          email_id: user.email_id,
          username: user.username,
        },
        user.uid
      );
      dispatch(
        setAuth({
          uid: user.uid,
          email_id: user.email_id,
          username: user.username,
        })
      );
    }
  };

  useEffect(() => {
    const user_data = JSON.parse(sessionStorage.getItem("user_data"));

    if (!loggedIn && user_data) {
      dispatch(setLoggedIn(true));
      return;
    }
    if (user_data) {
      console.log("layout");
      dispatch(setLoggedIn(true));
      getCreateData(user_data);
    }
  }, [loggedIn]);

  return (
    <div>
      <Outlet context={[googleAuth, gitAuth]} />
    </div>
  );
};

export default Layout;
