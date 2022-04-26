import React, { useContext } from 'react'
import { ScheduleContext } from '../context/ScheduleContext';

const Event = ({ event }) => {
  const { setEvent } = useContext(ScheduleContext);

  return (
    <p onClick={() => { setEvent(event) }}>{event.name}</p>
  )
}

export default Event