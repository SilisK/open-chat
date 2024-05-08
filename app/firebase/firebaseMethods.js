import app from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const auth = getAuth();

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
    await signOut();
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

export { auth, signUp, signIn, logOut, changeUsername };
