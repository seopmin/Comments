import React, { useEffect } from "react";
import Container from "../Layouts/Container";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userAction } from "../store/user-slice";

const MyPage = (props) => {
  const storedUser = localStorage.getItem("name");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (storedUser === null) {
      navigate("/");
    }
    dispatch(userAction.setUserName({name: storedUser}));
    async function fetchComment () {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/comments/`+storedUser);

        if(!response.ok) {
            navigate("/");
            return;
        }
        const data = await response.json();
        dispatch(userAction.setComments({name: storedUser, praises: data.user.praises, advices: data.user.advices}));
    }
    fetchComment();
  }, []);

  const userName = useSelector((state) => state.user.userName);
  const advices = useSelector((state) => state.user.advices);
  const praises = useSelector((state) => state.user.praises);
  return (
    <Container>
      <h1>"{userName}" page</h1>
      <div>
        <h3>Praises</h3>
        <ul>
          {praises.map((e) => {
            return <li key={e}>{e}</li>;
          })}
        </ul>
      </div>
      <div>
        <h3>Advices</h3>
        <ul>
          {advices.map((e) => {
            return <li key={e}>{e}</li>;
          })}
        </ul>
      </div>
    </Container>
  );
};

export default MyPage;
