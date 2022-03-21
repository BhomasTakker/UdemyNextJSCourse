import { NextPage } from "next";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  return (
    <>
      <UserProfile />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({
    req: context.req,
  });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return { props: { session } };
}

export default ProfilePage;
