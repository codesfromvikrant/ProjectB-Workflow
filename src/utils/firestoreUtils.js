import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

// Add a new document in collection "cities"
const createDoc = async (data, id) => {
  console.log("createDoc", data, id);
  try {
    const docRef = await setDoc(doc(db, "users", id), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.log(error);
  }
};

// Read document
const readDoc = async (id) => {
  try {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error);
  }
};

export { createDoc, readDoc };