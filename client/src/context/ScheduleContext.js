import React, { createContext, useReducer } from "react";
import ScheduleReducer from "./ScheduleReducer";

export const ScheduleContext = createContext()

export default function ScheduleProivder({children}) {
  const initialState = {
    date: new Date(),
    days: [],
    _class: null
  }

  const [state, dispatch] = useReducer(ScheduleReducer, initialState)

  const setDate = (date) => {
    dispatch({
      type: "SET_DATE",
      payload: date
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