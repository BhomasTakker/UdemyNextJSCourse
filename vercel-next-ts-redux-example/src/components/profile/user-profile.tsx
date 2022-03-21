import { useSession } from "next-auth/react";
import React from "react";
import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";

function UserProfile() {
  // Redirect away if NOT auth
  const { data: session, status } = useSession();
  const loading = status === "loading";

  const changePasswordHandler = async (passwordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };

  // if (loading) {
  //   return <p className={classes.profile}>We Loaden...</p>;
  // }

  // if (!session) {
  //   window.location.href = "/auth";
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
