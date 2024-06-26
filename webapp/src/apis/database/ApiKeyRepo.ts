import {
  getFirestore,
  doc,
  collection,
  getDoc as fsGetDoc,
  getDocs as fsGetDocs,
  updateDoc as fsUpdateDoc,
  deleteDoc as fsDeleteDoc,
  addDoc as fsAddDoc,
  query,
} from 'firebase/firestore';
import app from '../initFirebaseApp';
import type { ApiKey, ApiKeyDb, Log } from './models';
import { DocumentSnapshot } from 'firebase/firestore';

const db = getFirestore(app);

// Utility function to map a DocumentSnapshot to a type T
const fromSnapshot = <T>(snapshot: DocumentSnapshot): T | null => {
  if (snapshot.exists()) {
    const data = snapshot.data();
    return { ...data, id: snapshot.id } as unknown as T;
  }
  return null;
};

// ApiKeys Collection
const apiKeysCollectionName = 'apiKeys';
const apiKeysCollection = collection(db, apiKeysCollectionName);

export const getAllDocs = async (): Promise<ApiKey[]> => {
  const queryT = query(apiKeysCollection);
  const snapshot = await fsGetDocs(queryT);
  const apiKeys = snapshot.docs.map((doc) => fromSnapshot<ApiKey>(doc)!);
  return apiKeys;
};

export const getDoc = async (apiKeyId: string): Promise<ApiKey | null> => {
  const docRef = doc(db, apiKeysCollectionName, apiKeyId);
  const snapshot = await fsGetDoc(docRef);
  return fromSnapshot<ApiKey>(snapshot);
};

export const updateDoc = async (
  apiKeyId: string,
  updatedApiKey: Partial<ApiKey>
): Promise<void> => {
  try {
    const docRef = doc(db, apiKeysCollectionName, apiKeyId);
    await fsUpdateDoc(docRef, updatedApiKey);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDoc = async (apiKeyId: string): Promise<void> => {
  const docRef = doc(db, apiKeysCollectionName, apiKeyId);
  await fsDeleteDoc(docRef);
};

export const addDoc = async (apiKey: ApiKeyDb): Promise<void> => {
  const apiKeyColRef = collection(db, apiKeysCollectionName);
  await fsAddDoc(apiKeyColRef, apiKey);
};

export default {
  getAllDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  addDoc,
};
