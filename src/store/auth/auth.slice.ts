import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../pages/auth/components/authForm/AuthForm";
import { RootState } from "../index";

interface IInitialState {
  login: string;
  isAuth: boolean;
  id: number | null;
}
interface ILoginUserResponse {
  login: string;
  id: number;
}
export const loginUser = createAsyncThunk<ILoginUserResponse, IUser>(
  "@@auth/loginUser",
  async (user, { rejectWithValue }) => {
    const checkUser = await axios({
      url: `https://62aa4db13b3143855445970a.mockapi.io/users?login=${user.login}&password=${user.password}`,
      method: "GET",
    });

    if (checkUser.data.length === 0) {
      return rejectWithValue("Incorrect login or password");
    }

    if (checkUser.data[0].login !== user.login || checkUser.data[0].password !== user.password) {
      return rejectWithValue("Incorrect login or password");
    }

    const login = await axios({
      url: `https://62aa4db13b3143855445970a.mockapi.io/users/${checkUser.data[0].id}`,
      method: "PUT",
      headers: { "Content-Type": " application/json" },
      data: { isAuth: true },
    });
    return login.data;
  }
);
export const logoutUser = createAsyncThunk<void, void, { state: RootState }>(
  "@@auth/logoutUser",
  async (_, { getState }) => {
    const userID = getState().auth.entities.id;
    const response = axios({
      url: `https://62aa4db13b3143855445970a.mockapi.io/users/${userID}`,
      method: "PUT",
      data: { isAuth: false },
    });
  }
);
export const createUser = createAsyncThunk<any, IUser>(
  "@@auth/createUser",
  async (user, { rejectWithValue }) => {
    const checkUser = await axios({
      url: `https://62aa4db13b3143855445970a.mockapi.io/users?login=${user.login}`,
      method: "GET",
    });

    if (checkUser.data.some((u: IUser) => u.login === user.login)) {
      return rejectWithValue("This name is already in use");
    }
    const newUser = {
      login: user.login,
      password: user.password,
      isAuth: true,
    };

    const response = await axios({
      url: "https://62aa4db13b3143855445970a.mockapi.io/users",
      method: "POST",
      headers: { "Content-Type": " application/json" },
      data: newUser,
    });

    return response.data;
  }
);

const initialState: IInitialState = {
  login: "",
  isAuth: false,
  id: null,
};

export const authSlice = createSlice({
  name: "@@auth",
  initialState: {
    entities: initialState,
    loading: false,
    techError: "",
    userError: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.entities.login = action.payload.login;
        state.entities.id = action.payload.id;
        state.entities.isAuth = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.entities = initialState;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.entities.login = action.payload.login;
        state.entities.isAuth = true;
        state.entities.id = action.payload.id;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.userError = action.payload;
          state.techError = action.error.message;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.techError = "";
          state.userError = "";
        }
      );
  },
});
