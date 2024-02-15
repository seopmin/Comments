import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import ActiveBox from "../components/ActiveBox";
import styles from "./Root.module.css";
import openSocket from "socket.io-client";
import { useDispatch } from "react-redux";
import { userAction } from "../store/user-slice";

const RootLayout = (props) => {
  const socket = openSocket(`${process.env.REACT_APP_BASE_URL}`);
  const dispatch = useDispatch();

  socket.on("posts", (data) => {
    if (data.action === "newUser") {
      dispatch(userAction.setCurrentUsers({ currentUsers: data.post }));
    } else if (data.action === "newComment") {
      dispatch(
        userAction.setComments({
          name: data.post.name,
          praises: data.post.praises,
          advices: data.post.advices,
        })
      );
    }
  });

  return (
    <>
      <MainNavigation />
      <main className={styles.layout}>
        <Outlet />
        <ActiveBox />
      </main>
    </>
  );
};

export default RootLayout;
