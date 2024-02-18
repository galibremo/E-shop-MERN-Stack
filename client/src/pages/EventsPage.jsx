import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/EventCard";
import Footer from "../components/Layout/Footer";
import { useSelector } from "react-redux";

export default function Events() {
  const { allEvents } = useSelector((state) => state.events);

  return (
    <div>
      <Header activeHeading={4} />
      {allEvents.map((event, index) => (
        <EventCard key={index} active={true} data={event} />
      ))}
      <Footer />
    </div>
  );
}
