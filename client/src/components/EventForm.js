import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal'
import { CalendarContext } from "../context/CalendarContext";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const EventForm = () => {
  const { date, event, setEvent, saveEvent, setDate, deleteEvent } =  useContext(CalendarContext);

  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (event) {
      setName(event.name || "");
    }
  }, [event]);

  const closeModal = () => {
    setEvent(null);
    setError(false);
  };

  const saveTask = () => {
 
    if(name.trim().length < 1) {
        setError(true);
        return;
    }
    setError(false);

    saveEvent({
      ...event,
      date: date,
      name: name,
    });
    setDate(date);
    closeModal();

  };

  const deleteTask = ()=> {
    deleteEvent(event.id);
    setDate(date);
    closeModal();
    setError(false);
  }

  return (
    <Modal
      isOpen={event != null}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Task Form"
    >
      <div className="task-form">
        
        <label>Name</label>
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Task Name"
        />

        <div>
          <button className="button button-red" onClick={closeModal}>
            Cancel
          </button>
          {event && event.id ? (
            <button
              className="button button-orange"
              onClick={deleteTask}
            >
              Delete
            </button>
          ) : null}
          <button
            className="button button-green"
            onClick={saveTask}
          >
            Save
          </button>
        </div>
        {error ? <p className="error">The name of the task is required</p> : null}
      </div>
    </Modal>
  );
}

export default EventForm