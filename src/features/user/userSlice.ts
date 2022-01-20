import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import axios from "axios";

export const PAGESIZE = 10;

export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

export interface User {
  name: {
    title: string;
    first: string;
    last: string;
  };
  login: {
    username: string;
    [key: string]: unknown;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  }

  [key: string]: unknown;
}

export interface UsersState {
  users: User[];
  pageNumber: number;
  isLoading: boolean;
  error?: string;
}

const initialState: UsersState = {
  users: [],
  pageNumber: 1,
  isLoading: false,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  // Fetch 100 users at once
  const response = await axios.get('https://randomuser.me/api/?results=100');
  return response.data.results
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    sortByUserName: (state) => {
      state.users.sort((user1, user2) => user1.login.username.localeCompare(user2.login.username));
    },
    sortByFullName: (state) => {
      state.users.sort((user1, user2) =>
        `${user1.name.first} ${user1.name.last}`
          .localeCompare(`${user2.name.first} ${user2.name.last}`
          ))
    },
    changePageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    })
  }
});

export const {sortByUserName, sortByFullName, changePageNumber} = userSlice.actions;
export const selectUsers = (state: RootState) =>
  state.users.users.slice(( state.users.pageNumber -1 )* PAGESIZE, (state.users.pageNumber) * PAGESIZE);

export const selectPageNumber = (state: RootState) =>
  state.users.pageNumber;

export const selectTotalPage = (state: RootState) => state.users.users.length/PAGESIZE;

export default userSlice.reducer;
