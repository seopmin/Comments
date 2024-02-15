const express = require("express");
const User = require("./userModel");
const io = require("./socket");

const router = express.Router();

router.get("/comments/:userName", async (req, res, next) => {
  const userName = req.params.userName;

  const user = User.getUserObj(userName);


  if(user === null) {
    console.log('user===', user);
    res.status(501).json({message: 'not exist userName'});
    return;
  }
  console.log(user);
  res.status(201).json({ user: user });
})

router.get("/currentUserNameList", (req, res, next) => {
  console.log("# get currentUserNameList")
  const userNameList = [];
  User.memUserList.map((e, index) => {
    userNameList.push(e.name);

  });
  console.log(userNameList);
  res.status(201).json({ message: 'Event saved.', userNameList: userNameList });
});

router.post("/enter", (req, res, next) => {
  const data = req.body;

  const userNameList = [];

  let discern = false;
  User.memUserList.map((e, index) => {
    userNameList.push(e.name);
    if (e.name === data.userName) {
      discern = true;
      return;
    }
  });
  if (discern) {
    res.status(501).json({message: 'same name'})
    return;
  };

  userNameList.push(data.userName);
  console.log(userNameList);
  const user = new User(data.userName, [], []);
  User.memUserList.push(user);

  res.status(201).json({ message: 'Event saved.', event: data });
  io.getIO().emit('posts', { action: 'newUser', post: userNameList});
});

router.post("/comments", async (req, res, nex) => {
  const data = req.body;
  const user = User.addComments(data.user, data.praise, data.advice);
  if (user === null) {
    // 오류 처리
    if (discern) {
      res.status(502).json({message: 'not saved'})
      return;
    };
  }
  res.status(201).json({ message: 'Event saved.', event: data });
  io.getIO().emit('posts', { action: 'newComment', post: user});

});

module.exports = router; 