import { Fragment } from "react";
import { useRouter } from "next/router";
import EventSearch from "../../components/events/events-search";
import EventList from "../../components/events/EventsList";
import { getAllEvents } from "../../helpers/api-util";
import Head from "next/head";

const Evented = (props) => {
  const { events } = props; //getAllEvents();
  const router = useRouter();

  const onSearchHandler = (year, month) => {
    const fullpath = `/events/${year}/${month}`;

    router.push(fullpath);
  };

  return (
    <Fragment>
      <Head>
        <title>Events Title!!</title>
        <meta name="description" value="This shows up in trawled data!" />
      </Head>
      <EventSearch onSearch={onSearchHandler} />
      <EventList items={events} />
    </Fragment>
  );
};

export async function getStaticProps() {
  // const res = await fetch(
  //   "https://nextjs-course-ae717-default-rtdb.firebaseio.com/events.json"
  // );
  // const data = await res.json();

  // //console.log(data);

  // const events = [];
  // for (const key in data) {
  //   events.push({ ...data[key], id: key });
  // }
  //console.log(events);

  const events = await getAllEvents();

  return {
    props: {
      events,
    },
    revalidate: 60,
  };
}

export default Evented;
