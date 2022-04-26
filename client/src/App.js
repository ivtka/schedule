import Schedule from './components/Schedule'
import ScheduleProvider from './context/ScheduleContext'
import AuthProvider from './context/AuthContext'

function App() {
  return (
    <div className='container'>
      <AuthProvider>
        <ScheduleProvider>
          <Schedule />
        </ScheduleProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
