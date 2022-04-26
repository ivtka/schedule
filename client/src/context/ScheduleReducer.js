export default function ScheduleReducer(state, action) {
  switch (action.type) {
    case 'SET_DATE':
      const { date, days } = action.payload

      const d1 = new Date(date.getFullYear(), date.getMonth(), 1);
      d1.setDate(d1.getDate() - (d1.getDay() === 0 ? 7 : d1.getDay()));

      return {
        ...state,
        date: date,
        days: days
      }

    case 'SET_CLASS':
      return {
        ...state,
        _class: action.payload,
      }

    case 'SAVE_CLASS':
      const _class = action.payload

      // fetch

      return {
        ...state
      }

    case 'DELETE_CLASS':
      return {
        ...state
      }

    default:
      break
  }
}