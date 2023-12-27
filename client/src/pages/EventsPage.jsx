import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/EventCard";
import Footer from "../components/Layout/Footer";

export default function Events() {
  return (
    <div>
      <Header activeHeading={2} />
      <EventCard/>
      <Footer/>
    </div>
  );
}
