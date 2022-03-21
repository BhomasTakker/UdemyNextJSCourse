import fs, { writeFile } from "fs";
import path from "path";

export const buildFeedbackPath = () => {
  return path.join(process.cwd(), "data", "feedback.json");
};

export const extractFeedback = (filepath) => {
  const fileData = fs.readFileSync(filepath);
  return JSON.parse(fileData);
};

function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const feedback = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(),
      email,
      text: feedback,
    };

    const filepath = buildFeedbackPath();
    const data = extractFeedback(filepath);

    data.push(newFeedback);
    fs.writeFileSync(filepath, JSON.stringify(data));
    res
      .status(201)
      .json({ message: "Success!  Data Stored", feedback: newFeedback });
  } else {
    const filepath = buildFeedbackPath();
    const data = extractFeedback(filepath);
    res.status(200).json({ message: "Hello API Worldie!", feedback: data });
  }
}

export default handler;
