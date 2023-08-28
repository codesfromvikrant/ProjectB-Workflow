import { db } from '../firebase/config'
import { doc, getDoc, arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore'

const markAsComplete = async (projectID, uid) => {
  const docRef = doc(db, 'projects', uid);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return;
  const ongoing = docSnap.data().ongoing;
  const project_completed = ongoing.find((project) => project.id === projectID);
  await updateDoc(docRef, {
    ongoing: arrayRemove(project_completed),
    completed: arrayUnion(project_completed),
  });
  console.log('Project marked as complete');
  ongoing = ongoing.filter((project) => project.id !== projectID);
  return [ongoing, project_completed];
}

export { markAsComplete }