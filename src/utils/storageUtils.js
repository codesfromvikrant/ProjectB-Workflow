import { storage } from '../firebase/config';
import { ref } from "firebase/storage";

const storageRef = ref(storage, 'user_images/');

const uploadImage = async (filename, file) => {
  uploadBytes(filename, file).then((snapshot) => {
    console.log('Uploaded a blob or file!', snapshot);
  });
}


export { storageRef, uploadImage };