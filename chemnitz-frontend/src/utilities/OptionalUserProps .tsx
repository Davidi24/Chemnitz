
import React, { useEffect, useState } from "react";
import { User } from "@/types/User";
import { getUser } from "@/api/userApi";

export type OptionalUserProps = {
  user: User | null;
};

export function withOptionalUser<P extends OptionalUserProps>(
  WrappedComponent: React.ComponentType<P>
) {
  return function ComponentWithOptionalUser(props: Omit<P, keyof OptionalUserProps>) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const fetchedUser = await getUser();
          setUser(fetchedUser || null);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          setUser(null); 
        }
      };

      fetchUser();
    }, []); 

    return <WrappedComponent {...(props as P)} user={user} />;
  };
}
