import React, { useContext } from 'react'
import { ScheduleContext } from '../context/ScheduleContext'
import Event from './Event'

const Day = ({data}) => {
  const { setEvent } = useContext(ScheduleContext)

  return (
    <div className={`day`}>
      <div className="task-day">
        <div className="tasks">
          { data.map(day => <Event key={day.name} event={day}/>) }
        </div>
      </div>
      <div className="button button-blue add-button" onClick={() => setEvent({})}>+</div>
    </div>
  )
}

export default Day