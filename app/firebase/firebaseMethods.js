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
  doc,
  getDoc,
  getDocs,
  setDoc,
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

const doesUsernameExist = async (query) => {
  const usernameSnapshot = await getDoc(doc(db, "usernames", query));
  return usernameSnapshot.exists();
};

const createNewUser = async (newUserData) => {
  try {
    await setDoc(doc(db, "usernames", newUserData.username), {
      id: auth.currentUser.uid,
    });
    await setDoc(doc(db, "users", auth.currentUser.uid), {
      ...newUserData,
      created: Date(),
    });
    return newUserData;
  } catch (error) {
    throw error;
  }
};

const getUser = async (username) => {
  try {
    const usernameSnapshot = await getDoc(doc(db, "usernames", username));
    const id = usernameSnapshot.data().id;
    const userSnapshot = await getDoc(doc(db, "users", id));
    return userSnapshot;
  } catch (error) {
    throw error;
  }
};

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

const getIdByUsername = async (username) => {
  try {
    const usernameSnapshot = await getDoc(doc(db, "usernames", username));
    const id = usernameSnapshot.data().id;
    return id;
  } catch (error) {
    throw error;
  }
};

const verifyAuthByUsername = async (username) => {
  try {
    const id = await getIdByUsername(username);
    await auth.authStateReady();
    if (auth.currentUser) return auth.currentUser.uid === id;
    else return false;
  } catch (error) {
    throw error;
  }
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
  doesUsernameExist,
  createNewUser,
  getUser,
  getIdByUsername,
  verifyAuthByUsername,
};
