import { buildFeedbackPath, extractFeedback } from "../api/feedback";
import { Fragment, useState } from "react";

const FeedbackPage = (props) => {
  const [feedbackData, setFeedbackData] = useState(undefined);

  const loadFeedbackHandler = (id) => {
    console.log(id);
    fetch(`/api/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setFeedbackData(data.feedback);
      });
  };
  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export async function getStaticProps() {
  const filepath = buildFeedbackPath();
  const data = extractFeedback(filepath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
