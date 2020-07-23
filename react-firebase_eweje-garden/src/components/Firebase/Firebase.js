import Firebase from "firebase";
import FirebaseConfig from './FirebaseConfig';

const app = Firebase.initializeApp(FirebaseConfig);
export const db = app.database();
