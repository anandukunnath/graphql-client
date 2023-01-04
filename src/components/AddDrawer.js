import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { gql, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../redux/reducer";

import "../styles/components/drawer.css";

const CREATE_MOVIE = gql`
  mutation CreateMovie(
    $title: String!
    $rating: Float!
    $year: String!
    $image: String!
  ) {
    createMovie(title: $title, rating: $rating, year: $year, image: $image) {
      _id
      rating
      title
      year
      image
    }
  }
`;

export default function AddDrawer(props) {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [b64, setb64] = useState("");
  const [input, setInput] = useState({
    title: "",
    year: "",
  });
  const [createNew, { error, loading, data }] = useMutation(CREATE_MOVIE, {
    variables: {
      title: input.title,
      rating: value,
      year: input.year,
      image: b64,
    },
    onCompleted: (data) => {
      props.close();
      setInput({
        title: "",
        year: "",
      });
      setb64("");
      setValue(0);
      dispatch(fetchMovies());
    },
  });
  const onFileChange = (event) => {
    let baseURL = "";
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      baseURL = reader.result;
      setb64(baseURL);
    };
  };

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
            <Button variant="contained" component="label">
              Upload thumbnail
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={onFileChange}
              />
            </Button>
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
