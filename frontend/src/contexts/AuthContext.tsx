import { createContext } from "react";
import { type User } from "firebase/auth";

export interface AuthContextValue {
  user: User | null;
  initializing: boolean;
  loggingIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
); //Creates an empty box that contained AuthContextType or undefined. It will be undefined if authcontext is called outside of an authprovider, as it is the authprovider that sets the value for the authcontext in its return.
