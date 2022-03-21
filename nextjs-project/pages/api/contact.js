import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    // console.log(email);
    // console.log(name);
    // console.log(message);
    // console.log(req.body);
    // console.log(req);

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid Email. " + email });
      return;
    }

    if (!name || name.trim() === "") {
      res.status(422).json({ message: "Invalid Name." });
      return;
    }

    if (!message || message.trim() === "") {
      res.status(422).json({ message: "Invalid Message." });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };
    console.log(newMessage);
    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.pnz7e.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "nah. went wrong" });
      return;
    }
    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "nah. went wrong" });
      return;
    }
    client.close();
    res.status(201).json({ message: "Successfully Stored Message!" });
  }
};

export default handler;
