import { onAuthStateChanged, User } from "firebase/auth";
import axios, { AxiosInstance } from "axios";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../lib/firebase/app";
import { UserResponse, UserType } from "../types/user";

type UserContextType = {
  authUser: User | null;
  user: UserType | null;
  axiosInstance: AxiosInstance;
};

const UserContext = createContext<UserContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  return useContext(UserContext) as UserContextType;
}

export default function UserProvider({ children }: PropsWithChildren) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

  const axiosInstance = axios.create({ baseURL: "http://localhost:8000" });

  useEffect(() => {
    axiosInstance.interceptors.request.use(
      async (config) => {
        const accessToken = await authUser?.getIdToken();

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      (err) => console.error("Error updating interceptor:", err)
    );
  }, [authUser, axiosInstance.interceptors.request]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
  }, []);

  useEffect(() => {
    if (!authUser) return;

    axiosInstance
      .get<UserResponse>("/user")
      .then((res) => setUser(res.data.user))
      .catch((error) => console.error("Error in fetching user:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return (
    <UserContext.Provider value={{ authUser, user, axiosInstance }}>
      {children}
    </UserContext.Provider>
  );
}
