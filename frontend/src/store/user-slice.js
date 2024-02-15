import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userName: null,
    selectedUser: null,
    praises: [],
    advices: [],
    currentUsers: [],
  },
  reducers: {
    setUserName(state, action) {
      // console.log(action.payload.name);
      state.userName = action.payload.name;
    },
    setSelectedUser(state, action) {
      if (state.selectedUser === action.payload.name) {
        state.selectedUser = null;
      } else {
        state.selectedUser = action.payload.name;
      }
    },
    setCurrentUsers(state, action) {
      state.currentUsers = action.payload.currentUsers;
    },
    setComments(state, action) {
      console.log(action.payload.name);
      if (state.userName !== action.payload.name) return;
      state.praises = action.payload.praises;
      state.advices = action.payload.advices;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice;
