import React from "react";
import styles from "./UserBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../store/user-slice";

const UserBox = ({ name }) => {
  const clickedUserName = useSelector((state) => state.user.selectedUser);

  const dispatch = useDispatch();

  const clickHandler = () => {
    dispatch(userAction.setSelectedUser({ name }));
  };

  return (
    <button
      className={
        name == clickedUserName
          ? styles["box-container-clicked"]
          : styles["box-container"]
      }
      onClick={clickHandler}
    >
      {name}
    </button>
  );
};

export default UserBox;
