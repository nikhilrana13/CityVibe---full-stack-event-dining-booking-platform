import EventDetailCard from '../components/pages/EventPage/EventDetailCard';
import Navbar from '../components/common/Navbar';
import { useParams } from 'react-router-dom';
import Footer from '../components/pages/listyourevent/Footer';
import EventDetailShimmerCard from '../components/pages/EventPage/EventDetailShimmerCard';
import EventNotFoundFallback from '../components/pages/EventPage/EventNotFoundFallback';
import { Helmet } from 'react-helmet-async';
import { useGetEventDetailsQuery } from '@/redux/api/EventApi';

const EventDetailsPage = () => {
  const { id } = useParams()
  const eventQuery = useGetEventDetailsQuery(id,{
    skip:!id
  })
  const event = eventQuery?.data?.data?.event || {}
  
  // console.log("event",event)
  return (
    <>
      <Helmet>
        <title>{event?.title ? `${event.title} | CityVibe` : "CityVibe"}</title>
        <meta
          name="description"
          content={`Book tickets for ${event?.title} happening at ${event?.location}. Discover events on CityVibe.`}
        />
      </Helmet>
      <div className='w-full'>
        <Navbar />
        <section className='w-full py-10'>
          <div className='mx-auto px-4 gap-4 py-4 max-w-[1300px]'>
            {
              eventQuery?.isLoading ? (
                <EventDetailShimmerCard />
              ) : eventQuery?.isError ? (
                <EventNotFoundFallback />
              ) : (
                <EventDetailCard event={event} />
              )
            }
          </div>
        </section>
        <Footer />
      </div>
    </>

  );
}

export default EventDetailsPage;
