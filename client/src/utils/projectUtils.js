import { db } from '../firebase/config'
import { doc, getDoc, arrayRemove, arrayUnion, updateDoc } from 'firebase/firestore'

const projectRef = (uid) => { return doc(db, 'projects', uid) };

const getProjectDivisonData = async (uid, status) => {
  try {
    const ref = projectRef(uid);
    const projectSnap = await getDoc(ref)
    if (!projectSnap.exists()) return null
    const projectData = projectSnap.data()
    return projectData[status];
  } catch (error) {
    console.error(error)
  }
}

export { getProjectDivisonData, projectRef }