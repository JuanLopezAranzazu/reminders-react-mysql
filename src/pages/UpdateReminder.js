import React, { useEffect, useState } from "react";
import "./../styles/UpdateReminder.css";
import axios from "axios";
// routes
import { useParams } from "react-router-dom";

const UpdateReminder = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadReminder();
  }, []);

  const loadReminder = () => {
    const token = sessionStorage.getItem("authenticated");
    axios
      .get(`http://localhost:3001/reminders/${id}`, {
        headers: { "x-access-token": token },
      })
      .then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          setTitle(response.data.title);
          setDescription(response.data.description);
        }
      });
  };

  const updateReminder = (event) => {
    event.preventDefault();
    const token = sessionStorage.getItem("authenticated");
    axios
      .put(
        `http://localhost:3001/reminders/${id}`,
        { title, description },
        { headers: { "x-access-token": token } }
      )
      .then((response) => {
        if (response.data.error) {
          console.error(response.data.error);
        } else {
          console.log(response.data);
        }
      });
  };

  return (
    <div className="update-reminder">
      <form onSubmit={(event) => updateReminder(event)}>
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter description..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <input type="submit" value="UPDATE REMINDER" />
      </form>
    </div>
  );
};

export default UpdateReminder;
