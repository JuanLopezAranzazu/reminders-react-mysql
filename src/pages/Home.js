import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/Home.css";
// components
import Reminder from "./../components/Reminder";

const Home = () => {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = () => {
    const token = sessionStorage.getItem("authenticated");
    axios
      .get("http://localhost:3001/reminders", {
        headers: { "x-access-token": token },
      })
      .then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          setReminders(response.data);
        }
      });
  };

  const deleteReminder = (id) => {
    const token = sessionStorage.getItem("authenticated");
    axios
      .delete(`http://localhost:3001/reminders/${id}`, {
        headers: { "x-access-token": token },
      })
      .then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          console.log("DELETED REMINDER");
          loadReminders();
        }
      });
  };

  return (
    <div className="home">
      {reminders &&
        reminders.map((reminder) => {
          return (
            <Reminder
              {...reminder}
              key={reminder.id}
              deleteReminder={deleteReminder}
            />
          );
        })}
    </div>
  );
};

export default Home;
