import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./app";

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error in sign in:", error);
  }
};

export const signOut = async () => {
  try {
    return auth.signOut();
  } catch (error) {
    console.error("Error in sign out:", error);
  }
};
