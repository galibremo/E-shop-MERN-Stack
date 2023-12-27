import React from 'react'
import EventCard from './EventCard'

export default function Events() {
  return (
    <div className="max-w-[90rem] mx-auto p-4">
      <div className="text-[27px] text-center md:text-start font-[600] font-Roboto pb-[20px]">
        <h1>Popular Events</h1>
      </div>
      <div className="w-full grid">
        <EventCard/>
      </div>
    </div>
  )
}
