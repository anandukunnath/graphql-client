import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { gql, useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";
import { fetchMovies } from "../redux/reducer";

import cardImage from "../images/card-image.png";
import "../styles/components/moviecard.css";

const DELETE_MOVIE = gql`
  mutation DeleteMovie($deleteMovieId: String!) {
    deleteMovie(id: $deleteMovieId) {
      _id
    }
  }
`;

export default function MovieCard(props) {
  const dispatch = useDispatch();
  const [deleteOneMovie, { error, loading, data }] = useMutation(DELETE_MOVIE, {
    onError: (data) => {
      dispatch(fetchMovies());
    },
  });
  return (
    <div className="card-body">
      <Card sx={{ width: 245 }}>
        <CardMedia
          component="img"
          alt="green image"
          height="100"
          image={props.data.image.length > 15 ? props.data.image:cardImage } 
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Year : {props.data.year}
          </Typography>
          <Rating name="read-only" value={props.data.rating} readOnly />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => props.edit(props.data._id)}>
            Edit
          </Button>
          <Button
            size="small"
            onClick={() =>
              deleteOneMovie({ variables: { deleteMovieId: props.data._id } })
            }
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
