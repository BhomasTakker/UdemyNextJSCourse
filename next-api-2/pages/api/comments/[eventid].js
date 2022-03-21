import { MongoClient } from "mongodb";
import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "../../../helpers/db-util";

const handler = async (req, res) => {
  const eventId = req.query.eventid;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to database" });
    return;
  }

  //   const client = await MongoClient.connect(
  //     "mongodb+srv://Thomas:G~4k.mLaY~gKP9e@cluster0.pnz7e.mongodb.net/events?retryWrites=true&w=majority"
  //   );

  //   const db = client.db();
  //   await db.collection("emails").insertOne({ email: userEmail });

  if (req.method === "POST") {
    // add server side validation
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "invalid input" });
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    try {
      // const db = client.db();
      // const result = await db.collection("comments").insertOne(newComment);
      const result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added Comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "Error adding comment from database" });
    }

    // console.log(result);

    // newComment.id = result.insertedId;

    // console.log(email, name, text);
    // res.status(201).json({ message: "Added Comment", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({
        message: "Okay",
        comments: documents,
      });
    } catch (error) {
      res.status(500).json({ message: "fetching comments failed" });
    }
  }

  client.close();
};

export default handler;
