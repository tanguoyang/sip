import { initializeApp, getApp } from 'firebase/app';
import { FIREBASE_API } from 'src/config-global';

const initFirebaseApp = () => {
  // firebase initialize
  try {
    return getApp();
  } catch (error) {
    console.warn(error);
    // firebase initialize
    return initializeApp(FIREBASE_API);
  }
};

const app = initFirebaseApp();
export default app;
