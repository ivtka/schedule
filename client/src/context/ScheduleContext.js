import React, { createContext, useReducer } from "react";
import ScheduleReducer from "./ScheduleReducer";

export const ScheduleContext = createContext()

export default function ScheduleProivder({ children }) {
  const initialState = {
    date: new Date(),
    days: [],
    events: null
  }

  const [state, dispatch] = useReducer(ScheduleReducer, initialState)

  const setDate = async (date) => {
    const response = await fetch(`${process.env.REACT_APP_SCHEDULE}/event`, {
      method: 'GET'
    })

    const days = await response.json()

    dispatch({
      type: "SET_DATE",
      payload: { date, days }
    })
  }

  const setClass = (event) => {
    dispatch({
      type: "SET_EVENT",
      payload: event
    })
  }

  const saveClass = (event) => {
    dispatch({
      type: "SAVE_EVENT",
      payload: event
    })
  }

  const deleteClass = (eventID) => {
    dispatch({
      type: "DELETE_EVENT",
      payload: eventID
    })
  }

  return (
    <ScheduleContext.Provider value={{
      date: state.date,
      days: state.days,
      _class: state._class,

      setDate,
      setClass,
      saveClass,
      deleteClass
    }}>
      {children}
    </ScheduleContext.Provider>
  )
}