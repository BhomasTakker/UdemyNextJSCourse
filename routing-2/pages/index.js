import Head from "next/head";

import EventList from "../components/events/EventsList";
import { getFeaturedEvents } from "../helpers/api-util";

const Main = (props) => {
  const { featuredEvents } = props; //getFeaturedEvents();

  return (
    <div>
      <Head>
        <title>Next JS Events</title>
        <meta name="description" value="This shows up in trawled data!" />
      </Head>
      <EventList items={featuredEvents} />
    </div>
  );
};

export async function getStaticProps() {
  // const res = await fetch(
  //   "https://nextjs-course-ae717-default-rtdb.firebaseio.com/events.json"
  // );
  // const data = await res.json();

  // const filteredData = [];
  // for (const key in data) {
  //   if (data[key].isFeatured) filteredData.push({ ...data[key], id: key });
  // }
  const filteredData = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: filteredData,
    },
    revalidate: 1800,
  };
}

export default Main;
