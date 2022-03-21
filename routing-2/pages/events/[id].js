// import { useRouter } from "next/router";
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from "../../helpers/api-util";

import Head from "next/head";

import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { Fragment } from "react";
import ErrorAlert from "../../components/ui/error-alert";

const EventDetailsPage = (props) => {
  // const router = useRouter();

  // const eventId = router.query.id;

  const { event } = props;

  // const event = getEventById(eventId);
  // console.log(eventId);
  console.log(event);

  //console.log(router);
  if (!event) {
    return (
      <ErrorAlert>
        <p>No Events Found</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" value={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((ev) => ({ params: { id: ev.id } }));

  return {
    paths: paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const event = await getEventById(id);
  // if (!event) {
  //   return {
  //     notFound: true,
  //   };
  // }
  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export default EventDetailsPage;
