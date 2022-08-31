import { createSlice } from "@reduxjs/toolkit";


interface IInitialState {
  login: string,
  isAuth: boolean
}

const initialState = {
  login: '',
  isAuth: false
}



export const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {

  }
})