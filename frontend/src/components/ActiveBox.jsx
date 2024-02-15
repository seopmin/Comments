import React, { useEffect, useState } from "react";
import Container from "../Layouts/Container";
import styles from "./ActiveBox.module.css";
import UserBox from "./UserBox";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../store/user-slice";


const DUMMY_DATA = [
  { userName: "민섭" },
  { userName: "솔규" },
  { userName: "혜인" },
];


const ActiveBox = (props) => {
  const dispatch = useDispatch();
  const clickedUserName = useSelector((state) => state.user.selectedUser);
  const currentUsers = useSelector((state) => state.user.currentUsers);
  const [praise, setPraise] = useState('');
  const [advice, setAdvice] = useState('');
  
  const praiseTextHandler = (e) => {
    setPraise(e.target.value);
  };

  const adviceTextHandler = (e) => {
    setAdvice(e.target.value);
  };
  
  const submitHandler = async (e) => {
    e.preventDefault();

    if (clickedUserName === null) return;

    const eventData = {
      user: clickedUserName,
      praise: praise,
      advice: advice
    };
    setPraise('');
    setAdvice('');
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/comments/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
      
    });
    console.log(response);
  };

  useEffect(() => {
    async function fetchCurrentUsers() {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/currentUserNameList/`);

      
      const data = await response.json();
      console.log(data);
      dispatch(userAction.setCurrentUsers({ currentUsers: data.userNameList }));
    }
    fetchCurrentUsers();
  }, []);
  return (
    <Container>
      <h2>Let's leave some comments!</h2>
      <h3>&lt; active user &gt;</h3>
      <div className={styles["user-container"]}>
        <ul className={styles["user-ul"]}>
          {currentUsers && currentUsers.map((name) => (
            <UserBox key={name} name={name} />
          ))}
        </ul>
      </div>
      <div className={styles["bottom-bar"]}>
        <form onSubmit={submitHandler}>
          <h3>&lt; comments &gt;</h3>
          <span>to. {clickedUserName !== null ? clickedUserName : ""}</span>
          <div>
            <textarea
              name="praise"
              className={styles["custom-textarea"]}
              cols="30"
              rows="10"
              placeholder="praise..."
              required
              value={praise}
              onChange={praiseTextHandler}
            ></textarea>
            <textarea
              name="advice"
              className={styles["custom-textarea"]}
              cols="30"
              rows="10"
              placeholder="advice..."
              required
              value={advice}
              onChange={adviceTextHandler}
            ></textarea>
          </div>
          <button>send</button>
        </form>
      </div>
    </Container>
  );
};

export default ActiveBox;
