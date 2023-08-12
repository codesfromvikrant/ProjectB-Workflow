import { auth } from "../firebase/config"
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
const provider = new GoogleAuthProvider();

const googleAuth = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
  } catch (error) {
    console.log(error.code, error.message);
  }
}

const authStateChange = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      return user;
    } else {
      return null;
    }
  });
}

export { googleAuth, authStateChange }

