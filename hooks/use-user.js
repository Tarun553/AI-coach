import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import useFetch from "./use-fetch";
import { getUser } from "@/actions/user";

export function useUser() {
  const { userId, isLoaded: isAuthLoaded } = useAuth();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const {
    loading: fetchLoading,
    fn: fetchUser,
    data: userData,
  } = useFetch(getUser);

  useEffect(() => {
    if (isAuthLoaded && userId) {
      fetchUser();
    }
  }, [isAuthLoaded, userId]);

  useEffect(() => {
    if (userData) {
      setUser(userData);
      setIsLoading(false);
    }
  }, [userData]);

  return {
    user,
    isLoading: isLoading || fetchLoading || !isAuthLoaded,
    isAuthenticated: !!userId,
  };
} 