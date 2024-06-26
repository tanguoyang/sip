import {
  getFirestore,
  doc,
  collection,
  getDoc as fsGetDoc,
  getDocs as fsGetDocs,
  updateDoc as fsUpdateDoc,
  deleteDoc as fsDeleteDoc,
  setDoc as fsSetDoc,
  query,
} from 'firebase/firestore';
import app from '../initFirebaseApp';
import type { Log } from './models';
import { DocumentSnapshot } from 'firebase/firestore';

// Logs Collection

// Utility function to map a DocumentSnapshot to a type T
const fromSnapshot = <T>(snapshot: DocumentSnapshot): T | null => {
  if (snapshot.exists()) {
    const data = snapshot.data();
    return { ...data, id: snapshot.id } as unknown as T;
  }
  return null;
};

const db = getFirestore(app);
const logsCollectionName = 'logs';
const logsCollection = collection(db, logsCollectionName);

export const getAllDocs = async (): Promise<Log[]> => {
  const queryT = query(logsCollection);
  const snapshot = await fsGetDocs(queryT);
  const logs = snapshot.docs.map((doc) => fromSnapshot<Log>(doc)!);
  return logs;
};

export const getDoc = async (logId: string): Promise<Log | null> => {
  const docRef = doc(db, logsCollectionName, logId);
  const snapshot = await fsGetDoc(docRef);
  return fromSnapshot<Log>(snapshot);
};

export const updateDoc = async (logId: string, updatedLog: Partial<Log>): Promise<void> => {
  try {
    const docRef = doc(db, logsCollectionName, logId);
    await fsUpdateDoc(docRef, updatedLog);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDoc = async (logId: string): Promise<void> => {
  const docRef = doc(db, logsCollectionName, logId);
  await fsDeleteDoc(docRef);
};

export const setDoc = async (logId: string, log: Log): Promise<void> => {
  const logDocRef = doc(db, logsCollectionName, logId);
  await fsSetDoc(logDocRef, log);
};

export default {
  getAllDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
};
