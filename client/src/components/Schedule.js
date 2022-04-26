import React, { useContext, useEffect } from "react";
import { ScheduleContext } from "../context/ScheduleContext";
import Day from "./Day";

const Schedule = () => {
  const { date, days, setDate } = useContext(ScheduleContext);

  useEffect(() => {
    setDate(new Date())
  }, [])

  const names = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

  return (
    <>
      <div className="calendar borderless day-names">
        {names.map(name => <h5 key={name}>{name}</h5>)}
      </div>

      <div className="calendar">
        {days}
      </div>
    </>
  )
}

export default Schedule;