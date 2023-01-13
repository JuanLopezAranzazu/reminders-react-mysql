import React from "react";
import "./../styles/Reminder.css";
// routes
import { useNavigate } from "react-router-dom";

const Reminder = ({ id, title, description, deleteReminder }) => {
  const navigate = useNavigate();

  return (
    <div
      className="reminder"
      onClick={() => navigate(`/update-reminder/${id}`)}
    >
      <p>{title}</p>
      <p>{description}</p>
      <button onClick={() => deleteReminder(id)}>Delete</button>
    </div>
  );
};

export default Reminder;
