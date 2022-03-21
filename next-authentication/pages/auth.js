import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>We're loading!!</p>;
  }

  return <AuthForm />;
}

export default AuthPage;
