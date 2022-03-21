import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import AuthForm from "../components/auth/auth-form";

function AuthPage() {
  const [isloading, setIsLoading] = useState(true);
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  //this isn't correct - shows Auth for a moment
  if (session) {
    router.replace("/");
  }
  // else {
  //   setIsLoading(false);
  // }
  // if (isloading) {
  //   return <p>Loading</p>;
  // }

  return <AuthForm />;
}

export default AuthPage;
