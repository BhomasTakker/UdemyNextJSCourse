import { buildFeedbackPath, extractFeedback } from "./feedback";

const handler = (req, res) => {
  const feedbackId = req.query.feedbackid;
  const filepath = buildFeedbackPath();
  const data = extractFeedback(filepath);
  console.log("selectedFeedback ", data);
  console.log("selectedFeedback feedbackId ", feedbackId);
  const selectedFeedback = data.find((feedback) => feedback.id === feedbackId);

  console.log("selectedFeedback ", selectedFeedback);

  res.status(200).json({ feedback: selectedFeedback });
};

export default handler;
