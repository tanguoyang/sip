import {
  getFirestore,
  doc,
  collection,
  getDoc as fsGetDoc,
  getDocs as fsGetDocs,
  updateDoc as fsUpdateDoc,
  deleteDoc as fsDeleteDoc,
  setDoc as fsSetDoc,
  addDoc as fsAddDoc,
  query,
  where,
} from 'firebase/firestore';
import app from '../initFirebaseApp';
import type { Device, DeviceDb } from './models';
import { DocumentSnapshot } from 'firebase/firestore';

const db = getFirestore(app);
const collectionName = 'devices';
const deviceCollection = collection(db, collectionName);

export const getAllDocsByUid = async (): Promise<Device[]> => {
  const queryT = query(deviceCollection); // Combine into one query
  const snapshot = await fsGetDocs(queryT);
  const devices = snapshot.docs.map((doc) => fromSnapshot(doc)!);
  return devices;
};

export const getDoc = async (deviceId: string): Promise<Device | null> => {
  const docRef = doc(db, collectionName, deviceId);
  const snapshot = await fsGetDoc(docRef);
  return fromSnapshot(snapshot);
};

export const updateDoc = async (
  deviceId: string,
  updatedDevice: Partial<Device>
): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, deviceId);
    await fsUpdateDoc(docRef, updatedDevice);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteDoc = async (deviceId: string): Promise<void> => {
  const docRef = doc(db, collectionName, deviceId);
  await fsDeleteDoc(docRef);
};

// setDoc
export const setDoc = async (deviceId: string, device: DeviceDb): Promise<void> => {
  const deviceDocRef = doc(db, collectionName, deviceId); // databaseHandle, collectionName, documentID
  await fsSetDoc(deviceDocRef, device); // documentReference, Payload
};

const fromSnapshot = (snapshot: DocumentSnapshot): Device | null => {
  if (snapshot.exists()) {
    const data = snapshot.data();
    return { ...data, id: snapshot.id } as unknown as Device;
  }
  return null;
};

export default {
  getDoc,
  updateDoc,
  deleteDoc,
  setDoc,
};
