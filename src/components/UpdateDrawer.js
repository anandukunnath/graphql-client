import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { gql, useQuery, useMutation } from "@apollo/client";

import "../styles/components/drawer.css";

const GET_MOVIE = gql`
  query GetMovie($getMovieId: ID!) {
    getMovie(id: $getMovieId) {
      _id
      rating
      title
      year
      image
    }
  }
`;
const UPDATE_MOVIE = gql`
  mutation Mutation(
    $updateMovieId: ID!
    $title: String!
    $rating: Float!
    $year: String!
    $image: String!
  ) {
    updateMovie(
      id: $updateMovieId
      title: $title
      rating: $rating
      year: $year
      image: $image
    ) {
      _id
      rating
      title
      year
      image
    }
  }
`;

export default function UpdateDrawer(props) {
  const [value, setValue] = useState(0);
  const [input, setInput] = useState({
    title: "",
    year: "",
    image:""
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const { error, data, loading } = useQuery(GET_MOVIE, {
    variables: { getMovieId: props.id },
    onCompleted: (data) => {
      setInput({
        title: data.getMovie.title,
        year: data.getMovie.year,
        image:data.getMovie.image
      });
      setValue(data.getMovie.rating);
    },
  });

  const [updateNow, { data1 }] = useMutation(UPDATE_MOVIE, {
    variables: {
      updateMovieId: props.id,
      title: input.title,
      rating: value,
      year: input.year,
      image: input.image
    },
    onCompleted: (data) => {
      props.close();
    },
  });

  // if(loading)return <p>loading</p>
  return (
    <>
      <Drawer anchor={"bottom"} open={props.open} onClose={props.close}>
        <div className="add-form">
          <span className="form-items">
            <TextField
              id="outlined-basic"
              name="title"
              label="Enter movie name"
              variant="outlined"
              onChange={handleChange}
              value={input.title}
            />
            <TextField
              id="outlined-basic"
              onChange={handleChange}
              name="year"
              value={input.year}
              label="Year of release"
              variant="outlined"
            />
            <Rating
              name="simple-controlled"
              className="rating"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <Button variant="contained" onClick={updateNow}>
              Update Record
            </Button>
          </span>
        </div>
      </Drawer>
    </>
  );
}
