import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { AuthFormType } from "../types/auth";

interface AuthFormContextValue {
  formType: AuthFormType;
  /** Replace the formType outright */
  setFormType: (value: AuthFormType) => void;
  /** Handy helper: switch between login ↔ register */
  toggleFormType: () => void;
}

const AuthFormContext = createContext<AuthFormContextValue | undefined>(undefined);

interface ProviderProps {
  /** Starting view – default is "login" */
  initialFormType?: AuthFormType;
  children: ReactNode;
}

export function AuthFormProvider({ initialFormType = "login", children }: ProviderProps) {
  const [formType, setFormType] = useState<AuthFormType>(initialFormType);

  const toggleFormType = useCallback(
    () => setFormType((prev) => (prev === "login" ? "register" : "login")),
    []
  );

  return (
    <AuthFormContext.Provider value={{ formType, setFormType, toggleFormType }}>
      {children}
    </AuthFormContext.Provider>
  );
}

/** Convenience hook so you don’t call useContext all over */
export function useAuthForm() {
  const ctx = useContext(AuthFormContext);
  if (!ctx) {
    throw new Error("useAuthForm must be used inside <AuthFormProvider>");
  }
  return ctx;
}
