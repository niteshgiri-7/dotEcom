import { useQuery } from "@tanstack/react-query";
import { getAuth } from "firebase/auth";
import { checkAuth } from "../api/auth";
import { useEffect, useState } from "react";

const auth = getAuth();

export const useAuth = () => {
  console.log("calling useAuth");
  const [isAuthReady, setIsAuthReady] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => setIsAuthReady(true));

    return () => unsubscribe();
  }, []);

  return useQuery({
    queryKey: ["auth", auth.currentUser?.uid],
    queryFn: checkAuth,
    staleTime: Infinity,
    retry: false, //kina false? axios response interceptor le (token expiry ko karan) is handling the refreshment
    enabled: isAuthReady,
  });
};
