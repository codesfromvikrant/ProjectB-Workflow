import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// Add a new document in collection "cities"
const createDocInUsers = async (data, id) => {
  try {
    const docRef = await setDoc(doc(db, "users", id), data);
  } catch (error) {
    console.error(error);
  }
};

const createDocInProjects = async (data, id) => {
  try {
    const docRef = await setDoc(doc(db, "projects", id), data);
  } catch (error) {
    console.error(error);
  }
};

export { createDocInUsers, createDocInProjects };