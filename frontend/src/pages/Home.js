import React, { useState } from "react";
import Container from "../Layouts/Container";
import { Form, redirect, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userAction } from "../store/user-slice";

const HomePage = (props) => {
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const textChangeHandler = (e) => {
    if (e.target.value.length > 5) return;
    setUserName(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    

    const eventData = {
      userName: e.target.name.value,
    };
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/enter/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    if (response.status === 101) {
        console.log("same name")
        return;
    }
    dispatch(userAction.setUserName({ name: e.target.name.value }));
    localStorage.setItem('name', e.target.name.value);

    navigate("/mypage");
  };

  return (
    <Container>
      <h1>Your Name</h1>
      <form onSubmit={onSubmit}>
        <input
          id="name"
          type="text"
          name="name"
          value={userName}
          required
          placeholder="최대 5자"
          onChange={textChangeHandler}
        />
        <button>Enter</button>
      </form>
    </Container>
  );
};

export default HomePage;
