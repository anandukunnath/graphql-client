import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import AddDrawer from "../components/AddDrawer";
import MovieList from "../components/MovieList";
import UpdateDrawer from "../components/UpdateDrawer";
import ErrorComponent from "../components/ErrorComponent";

import "../styles/containers/homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "../redux/reducer";

function Homepage(props) {
  const dispatch = useDispatch();
  const { entities, loading } = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [current, setCurrent] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditClose = () => setCurrent(null);

  const recieveBack = (data) => {
    setCurrent(data);
    setOpenEdit(true);
  };

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  return (
    <>
      <Header />
      {entities.data?.getMovies.length > 0 ? (
        <MovieList data={entities.data.getMovies} sendBack={recieveBack} />
      ) : <ErrorComponent/>}

      <div className="add-button" onClick={() => setOpen(true)}>
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
      <AddDrawer open={open} close={handleClose} />
      {current ? (
        <UpdateDrawer open={openEdit} close={handleEditClose} id={current} />
      ) : null}
    </>
  );
}
export default Homepage;
