import React, { useState, useRef } from "react";
import classes from "./auth-form.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

//login in and sign up pages.
//logon by username / login by email

async function createUser(email, password, user) {
  const result = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, username: user }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await result.json();

  if (!result.ok) {
    throw new Error(data.message || "Error saving data");
  }

  return data;
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const usernameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (evt) => {
    evt.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredUser = usernameRef.current.value;
    const enteredPassword = passwordRef.current.value;
    //add validation

    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
        username: enteredUser,
      });

      if (!result.error) {
        router.replace("/profile");
      }
    } else {
      try {
        const result = await createUser(
          enteredEmail,
          enteredPassword,
          enteredUser
        );
      } catch (error) {
        console.log("error ", error.message);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"} eedde </h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" required ref={usernameRef} />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
