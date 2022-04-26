import React, { createContext, useReducer } from "react";
import ScheduleReducer from "./ScheduleReducer";

export const ScheduleContext = createContext()

export default function ScheduleProivder({ children }) {
  const initialState = {
    date: new Date(),
    days: [],
    _class: null
  }

  const [state, dispatch] = useReducer(ScheduleReducer, initialState)

  const setDate = async (date) => {
    const params = new URLSearchParams({
      action: 'SET_DATE',
    })

    const response = await fetch(`${process.env.REACT_APP_SCHEDULE}?${params}`, {
      method: 'GET'
    })

    const days = response.json()

    dispatch({
      type: "SET_DATE",
      payload: { date, days }
    })
  }

  const setClass = (_class) => {
    dispatch({
      type: "SET_CLASS",
      payload: _class
    })
  }

  const saveClass = (_class) => {
    dispatch({
      type: "SAVE_CLASS",
      payload: _class
    })
  }

  const deleteClass = (classId) => {
    dispatch({
      type: "DELETE_CLASS",
      payload: classId
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