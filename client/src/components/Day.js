import React, { useContext } from 'react'
import { ScheduleContext } from '../context/ScheduleContext'
import Class from './Class'

const Day = ({ day, date }) => {
  const { setClass, setDate } = useContext(ScheduleContext)

  const selected = day === date;
  const style = (selected ? 'selected-day' : '')

  return (
    <div className={`day ${style}`} onClick={() => setDate(day.date)}>
      <div className="class-day">
        <div className="classes">
          {day.tasks.map(_class => (
            <Class key={_class.id} _class={_class} />
          ))}

        </div>
        <h3> {day} </h3>
      </div>
      {selected ? <div className="button button-blue add-button" onClick={() => setClass({})}>+</div> : null}
    </div>
  )
}

export default Day