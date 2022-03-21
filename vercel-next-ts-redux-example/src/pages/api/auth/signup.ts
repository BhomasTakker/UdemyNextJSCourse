import { hashPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email, password, username } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7 ||
    !username ||
    username.trim().length < 3
  ) {
    res
      .status(422)
      .json({ message: "Invalid input - email or password is invalid " });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const existingUsername = await db
    .collection("user-auth")
    .findOne({ username: username });
  const existingUserEmail = await db
    .collection("user-auth")
    .findOne({ email: email });

  if (existingUsername) {
    res.status(422).json({ message: "Username already exists" });
    client.close();
    return;
  }
  if (existingUserEmail) {
    res.status(422).json({ message: "Email already exists" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("user-auth").insertOne({
    email: email,
    password: hashedPassword,
    username: username,
  });

  res.status(201).json({ message: "Successfully added a user" });
  client.close();
  return;
};

export default handler;
