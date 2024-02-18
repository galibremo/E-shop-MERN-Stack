import React from "react";
import { useSelector } from "react-redux";
import EventCard from "./EventCard";

export default function Events() {
  const { allEvents, loading } = useSelector((state) => state.events);
  return (
    <div>
      {!loading && (
        <div className="max-w-[90rem] mx-auto">
          <div className="text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]">
            <h1>Popular Events</h1>
          </div>

          <div className="w-full grid">
            {allEvents?.length !== 0 && (
              <EventCard data={allEvents && allEvents[0]} />
            )}
            <h4>{allEvents?.length === 0 && "No Events have!"}</h4>
          </div>
        </div>
      )}
    </div>
  );
}
