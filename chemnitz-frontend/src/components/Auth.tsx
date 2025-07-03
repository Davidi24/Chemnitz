"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/User";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/getUser", {
          credentials: "include",
        });
        if (!res.ok) throw new Error();
        const user: User = await res.json();
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
      } catch {
        setUser(null);
        localStorage.removeItem("user");
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
