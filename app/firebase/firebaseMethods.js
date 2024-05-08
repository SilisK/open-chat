import app from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";

const auth = getAuth();
const db = getFirestore(app);

// -- AUTHENTICATION --

// Sign up
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign in
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Sign out
const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

const changeUsername = async (username) => {
  try {
    return await updateProfile(auth.currentUser, { displayName: username });
  } catch (error) {
    throw error;
  }
};

// -- AUTHENTICATION --

// -- DATABASE --

const getCollection = async (collectionName) => {
  try {
    const snapshot = await getDocs(collection(db, collectionName));
    const array = [];
    snapshot.forEach((doc) => {
      array.push({ id: doc.id });
    });
    return array;
  } catch (error) {
    throw error;
  }
};

// -- DATABASE --

export { auth, db, signUp, signIn, logOut, changeUsername, getCollection };
