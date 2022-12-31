import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { gql, useMutation } from "@apollo/client";

import "../styles/components/drawer.css";

const CREATE_MOVIE = gql`
  mutation CreateMovie($title: String!, $rating: Float!, $year: String!) {
    createMovie(title: $title, rating: $rating, year: $year) {
      _id
      rating
      title
      year
    }
  }
`;

export default function AddDrawer(props) {
  const [value, setValue] = useState(0);
  const [input, setInput] = useState({
    title: "",
    year: "",
  });
  const [createNew, { error, loading, data }] = useMutation(CREATE_MOVIE, {
    variables: {
      title: input.title,
      rating: value,
      year: input.year,
    },
    onCompleted: (data) => {
      props.close();
      setInput({
        title: "",
        year: "",
      });
      setValue(0);
    },
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

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
            <Button variant="contained" onClick={() => createNew()}>
              {" "}
              Add to list
            </Button>
          </span>
        </div>
      </Drawer>
    </>
  );
}
