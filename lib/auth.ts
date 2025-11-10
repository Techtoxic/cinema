import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  User,
  onAuthStateChanged,
  AuthError
} from "firebase/auth";
import { auth } from "./firebase";

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(authError.message || "Failed to sign in");
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    const authError = error as AuthError;
    throw new Error(authError.message || "Failed to sign out");
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

