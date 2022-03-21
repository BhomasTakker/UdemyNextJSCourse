import { getSession } from "next-auth/client";
import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  console.log("HERE1");
  const session = await getSession({ req: req });

  if (!session) {
    //create a helper no?
    res.status(401).json({ message: "Not Authenticated" });
    return;
  }
  console.log("HERE2");
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ email: userEmail });

  console.log("HERE3");

  if (!user) {
    res.status(404).json({ message: "No user found" });
    client.close();
    return;
  }

  console.log("HERE4");

  const currentPassword = user.password;
  console.log(oldPassword);
  console.log(newPassword);
  console.log(currentPassword);

  const passwordValid = await verifyPassword(oldPassword, currentPassword);

  console.log("HERE5");

  if (!passwordValid) {
    res.status(403).json({ message: "Password might be incorrect" });
    client.close();
    return;
  }

  console.log("HERE6");

  const hashedPassword = await hashPassword(newPassword);

  console.log("HERE7");

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );

  console.log("HERE8");

  client.close();
  res.status(200).json({ message: "Password updated" });
};

export default handler;
