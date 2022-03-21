import { getSession } from "next-auth/react";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getSession({ req: req });

  //OUR AUTHENTICATION
  //IF NOT LOGGED IN - MONKEY ON THE CAR
  if (!session) {
    res.status(401).json({ message: "Not Authenticated" });
    return;
  }

  const userEmail = session.user.email;
  //const username = session.user.username;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  console.log("BODY ", req.body);

  console.log("BODY ", req.body.oldPassword);

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("user-auth");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User was not found" });
    client.close();
    return;
  }

  const currentPassword = user.password;
  console.log("HERE1 ", oldPassword, newPassword, currentPassword);
  const isValid = await verifyPassword(oldPassword, currentPassword);
  console.log("HERE2");
  if (!isValid) {
    res.status(403).json({ message: "Invalid password" });
    client.close();
    return;
  }
  console.log("HERE2");
  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );
  console.log("HERE3");
  client.close();
  res.status(200).json({ message: "Password updated!" });
};

export default handler;
