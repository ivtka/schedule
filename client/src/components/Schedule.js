import React, { useContext, useEffect } from "react";
import { ScheduleContext } from "../context/ScheduleContext";
import Day from './Day'

const Schedule = () => {
  const { days, setDate } = useContext(ScheduleContext);

  useEffect(() => {
    setDate(new Date())
  }, [])

  const names = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт'];

  if (!days.data) {
    return <div>Loading...</div>
  }

  const monday = days.data.filter(day => day.day === "MONDAY")
  const tuesdaay = days.data.filter(day => day.day === "TUESDAY")
  const wednesday = days.data.filter(day => day.day === "WEDNESDAY")
  const thursday = days.data.filter(day => day.day === "THURSDAY")
  const friday = days.data.filter(day => day.day === "FRIDAY")

  return (
    <>
      <div className="calendar borderless day-names">
        {names.map(name => <h5 key={name}>{name}</h5>)}
      </div>

      <div className="calendar">
        <Day data={tuesdaay} />
        <Day data={monday} />
        <Day data={wednesday} />
        <Day data={thursday} />
        <Day data={friday} />
      </div>
    </>
  )
}

export default Schedule;