import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import type { ReactNode } from "@tanstack/react-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "../services/firebaseService";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  //Components that are wrapped in this will have access to all the properties and functions.
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); //Is set to null if user logs out.
      setInitializing(false);
    });
    return unsubscribe; //Cleanup function that is called on unmount of component, this one
  }, []);

  const login = async (email: string, password: string) => {
    setLoggingIn(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.warn("Login failed.", error);
      throw error;
    } finally {
      setLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.warn("Logout failed.", error);
      throw error;
    }
  };

  const register = async (email: string, password: string): Promise<void> => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.warn("Registration failed.", error);
      throw error;
    }
  };

  const authContextValue = {
    //The object given to callers calling useContext(AuthContext) inside the authcontext provider tree.
    user,
    initializing,
    loggingIn,
    login,
    logout,
    register,
  };

  return (
    //The children can contact the context via useContext, and when they do they are given the authContextValue object.
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
