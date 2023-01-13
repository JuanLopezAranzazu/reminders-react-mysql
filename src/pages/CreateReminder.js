import React, { useState } from "react";
import "./../styles/CreateReminder.css";
import axios from "axios";

const CreateReminder = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const createReminder = () => {
    const token = sessionStorage.getItem("authenticated");
    axios
      .post(
        "http://localhost:3001/reminders",
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
    <div className="create-reminder">
      <form onSubmit={() => createReminder()}>
        <input
          type="text"
          placeholder="Enter title..."
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          type="text"
          placeholder="Enter description..."
          onChange={(event) => setDescription(event.target.value)}
        />
        <input type="submit" value="CREATE REMINDER" />
      </form>
    </div>
  );
};

export default CreateReminder;
