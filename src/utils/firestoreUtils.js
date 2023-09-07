import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
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

const getProjectsData = async (projectId) => {
  try {
    const projectRef = doc(db, "projects", projectId);
    const projectSnap = await getDoc(projectRef);
    if (!projectSnap.exists()) return null;
    return projectSnap.data();
  } catch (error) {
    console.error(error);
  }
}

export { createDocInUsers, createDocInProjects, getProjectsData };