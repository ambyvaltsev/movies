import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { loadFromStorage,  saveToStorage } from "../../helpers/localStorage";
import { IUser } from "../../components/authForm/AuthForm";
import { RootState } from "../index";

interface IInitialState {
  login: string;
  isAuth: boolean;
  id: number | null;
  date: string;
}
interface ILoginUserResponse {
  login: string;
  id: number;
  date: string
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

    const { data } = await axios({
      url: `https://62aa4db13b3143855445970a.mockapi.io/users/${checkUser.data[0].id}`,
      method: "PUT",
      headers: { "Content-Type": " application/json" },
      data: { isAuth: true },
    });
    return { login: data.login, id: data.id, isAuth: true, date: data.reg };
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
export const createUser = createAsyncThunk<ILoginUserResponse, IUser>(
  "@@auth/createUser",
  async (user, { rejectWithValue }) => {
    const checkUser = await axios({
      url: `https://62aa4db13b3143855445970a.mockapi.io/users?login=${user.login}`,
      method: "GET",
    });

    if (checkUser.data.some((u: IUser) => u.login === user.login)) {
      return rejectWithValue("This name is already in use");
    }
    const regDate = new Date().toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const newUser = {
      login: user.login,
      password: user.password,
      isAuth: true,
      reg: regDate,
    };

    const { data } = await axios({
      url: "https://62aa4db13b3143855445970a.mockapi.io/users",
      method: "POST",
      headers: { "Content-Type": " application/json" },
      data: newUser,
    });

    return { login: data.login, id: data.id, isAuth: true, date: data.reg };
  }
);

const user = loadFromStorage("user");

const initialState: IInitialState = {
  login: user ? user.login : "",
  isAuth: user ? true : false,
  id: user ? user.id : null,
  date: "",
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
        state.entities.date = action.payload.date;
        saveToStorage("user", action.payload);
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.entities = initialState;
        
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.entities.login = action.payload.login;
        state.entities.isAuth = true;
        state.entities.id = action.payload.id;
        state.entities.date = action.payload.date;
        saveToStorage("user", action.payload);
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
