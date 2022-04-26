import React, { useContext } from 'react'
import { ScheduleContext } from '../context/ScheduleContext';

const Class = ({ _class }) => {
  const { setClass } = useContext(ScheduleContext);

  return (
    <p onClick={() => { setClass(_class) }}>{_class.name}</p>
  )
}

export default Class