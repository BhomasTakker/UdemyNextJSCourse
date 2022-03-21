import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Credentials({
      //we need authorize by username perhaps?
      async authorize(credentials) {
        const client = await connectToDatabase();

        const usersCollection = client.db().collection("user-auth");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          client.close();
          throw new Error("No User found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Couldne log ye in!");
        }

        client.close();
        return {
          email: user.email,
          username: user.username,
        };
      },
    }),
  ],
});
