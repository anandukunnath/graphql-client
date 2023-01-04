import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../index";
import { gql } from "@apollo/client";

const GET_MOVIES = gql`
  query GetMovies {
    getMovies {
      _id
      rating
      title
      year
      image
    }
  }
`;

const initialState = {
  entities: [],
  loading: false,
};

export const fetchMovies = createAsyncThunk("posts/getPosts", async () => {
  const res = await client.query({
    query: GET_MOVIES,
    fetchPolicy: "no-cache",
  });
  return res;
});

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMovies.pending]: (state) => {
      state.loading = true;
    },
    [fetchMovies.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entities = payload;
    },
    [fetchMovies.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const postReducer = postSlice.reducer;
