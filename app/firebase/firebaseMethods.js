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
  doc,
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

const getAllUsers = async () => {
  try {
    const users = [];

    const usersSnapshot = await getDocs(collection(db, "users"));
    usersSnapshot.forEach((doc) => {
      var data = doc.data();
      users.push({ id: doc.id, username: data.username });
    });

    return users;
  } catch (error) {
    throw error;
  }
};

const getAllPosts = async () => {
  try {
    const posts = [];

    const postsSnapshot = await getDocs(collection(db, "posts"));
    postsSnapshot.forEach((doc) => {
      var data = doc.data();
      posts.push({
        id: doc.id,
        author: data.author,
        authorId: data.authorId,
        comments: data.comments,
        likes: data.likes,
        text: data.text,
      });
    });

    return posts;
  } catch (error) {
    throw error;
  }
};

const getAllComments = async (postId) => {
  const ref = doc(db, "posts", postId);
  const snapshot = await getDoc(ref);
  return snapshot.data().comments;
};

// -- DATABASE --

export {
  auth,
  db,
  signUp,
  signIn,
  logOut,
  changeUsername,
  getAllUsers,
  getAllPosts,
  getAllComments,
};
