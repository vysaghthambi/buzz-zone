import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../lib/firebase/app";

const UserContext = createContext<{ user: User | null }>({ user: null });

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext);
}

export default function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}
