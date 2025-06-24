import { useContext } from "react";
import type { AuthContextValue } from "@contexts/AuthContext";
import { AuthContext } from "@contexts/AuthContext";

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth can only be used by components nested within an AuthProvider",
    );
  }
  return context;
};
